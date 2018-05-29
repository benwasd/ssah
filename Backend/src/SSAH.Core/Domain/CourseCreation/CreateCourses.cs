using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;

using Autofac;

using SSAH.Core.Domain.Demanding;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Messages;
using SSAH.Core.Extensions;
using SSAH.Core.Messaging;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.CourseCreation
{
    public class CreateCourses : AutoAttachMessageObserverBase
    {
        protected override IEnumerable<IDisposable> SetupCore(IQueue queue, IContainer rootContainer)
        {
            yield return queue
                .OfType<ParticipantRegistredMessage>()
                .Buffer(Observable.Interval(TimeSpan.FromMinutes(1)))
                .ObserveOn(queue.Scheduler)
                .Where(messages => messages.Count > 0)
                .SubscribeInUnitOfWorkScope<IList<ParticipantRegistredMessage>, Handler>(rootContainer);
        }

        public class Handler : ObserverBase<IList<ParticipantRegistredMessage>>
        {
            private readonly ICourseRepository _courseRepository;
            private readonly IDemandService _demandService;
            private readonly ISolver _solver;
            private readonly ISerializationService _serializationService;
            private readonly ICourseCreationService _courseCreationService;
            private readonly IUnitOfWork _unitOfWork;
            private readonly IQueue _queue;

            public Handler(ICourseRepository courseRepository, IDemandService demandService, ISolver solver, ISerializationService serializationService, ICourseCreationService courseCreationService, IUnitOfWork unitOfWork, IQueue queue)
            {
                _courseRepository = courseRepository;
                _demandService = demandService;
                _solver = solver;
                _serializationService = serializationService;
                _courseCreationService = courseCreationService;
                _unitOfWork = unitOfWork;
                _queue = queue;
            }

            protected override void OnNextCore(IList<ParticipantRegistredMessage> messages)
            {
                var proposalCourseIds = messages.Select(m => m.ProposalCourseId).Distinct();

                foreach (var proposalCourseId in proposalCourseIds)
                {
                    var proposalCourse = _courseRepository.GetById(proposalCourseId);

                    if (proposalCourse is GroupCourse proposalGroupCourse)
                    {
                        SolveAndApplyGroupCourseComposition(proposalGroupCourse);
                    }
                }
            }

            private void SolveAndApplyGroupCourseComposition(GroupCourse proposalGroupCourse)
            {
                var solverParticipants = proposalGroupCourse.Participants.Select(p => new SolverParticipant(p.Participant, courseNiveauId: proposalGroupCourse.NiveauId)).ToArray();
                var solverResults = Enumerable.Range(1, proposalGroupCourse.MaximalBoundedInstructorCount())
                    .Select(i => _solver.Solve(new SolverParam(i, solverParticipants)))
                    .ToArray();

                var committedGroupCourseIds = new Guid[0];

                foreach (var efficientCourse in EfficientResult(solverResults).Courses)
                {
                    var participantIds = efficientCourse.Participants.Select(p => p.Id).ToArray();

                    var course = _courseCreationService.GetOrCreateGroupCourse(proposalGroupCourse, participantIds, committedGroupCourseIds);
                    course.ApplyParticipants(participantIds);
                    course.ApplyInstructor(() =>
                        SelectInstructor(
                            _demandService.GetAvailableInstructorsForGroupCourses(
                                proposalGroupCourse.Discipline, proposalGroupCourse.GetAllCourseDates(_serializationService).ToArray()
                            )
                        )
                    );

                    var isNew = course.RowVersion == null || course.RowVersion.Length == 0;

                    _unitOfWork.Commit();

                    if (isNew)
                    {
                        _queue.Publish(new CommittedCourseCreatedMessage(course.Instructor?.Id, course.Id));
                    }
                    else
                    {
                        _queue.Publish(new CommittedCourseChangedMessage(course.Instructor?.Id, course.Id));
                    }

                    committedGroupCourseIds = committedGroupCourseIds.Concat(new[] { course.Id }).ToArray();
                }

                if (_courseCreationService.RemoveUnusedButMatchingGroupCourses(proposalGroupCourse, committedGroupCourseIds))
                {
                    _unitOfWork.Commit();
                }
            }

            private static SolverResult EfficientResult(IEnumerable<SolverResult> results)
            {
                return results.OrderBy(r => r.Courses.Count() * r.Score).First();
            }

            public static Instructor SelectInstructor(IEnumerable<Instructor> availableInstructor)
            {
                // TODO: Change, currently always try to use the same instructor
                // var random = new Random();
                // return availableInstructor.OrderBy(i => random.Next(0, 100)).FirstOrDefault();

                return availableInstructor.OrderBy(i => i.Id).FirstOrDefault();
            }

            protected override void OnErrorCore(Exception error)
            {
            }

            protected override void OnCompletedCore()
            {
            }
        }
    }
 }