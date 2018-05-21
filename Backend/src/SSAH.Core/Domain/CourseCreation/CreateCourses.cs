﻿using System;
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

            public Handler(ICourseRepository courseRepository, IDemandService demandService, ISolver solver, ISerializationService serializationService, ICourseCreationService courseCreationService, IUnitOfWork unitOfWork)
            {
                _courseRepository = courseRepository;
                _demandService = demandService;
                _solver = solver;
                _serializationService = serializationService;
                _courseCreationService = courseCreationService;
                _unitOfWork = unitOfWork;
            }

            protected override void OnNextCore(IList<ParticipantRegistredMessage> messages)
            {
                var proposalCourseIds = messages.Select(m => m.ProposalCourseId).Distinct();

                foreach (var proposalCourseId in proposalCourseIds)
                {
                    var proposalCourse = _courseRepository.GetById(proposalCourseId);
                    var solverParticipants = proposalCourse.Participants.Select(p => new SolverParticipant(p.Participant)).ToArray();

                    if (proposalCourse is GroupCourse proposalGroupCourse)
                    {
                        CreateGroupCourse(proposalGroupCourse, solverParticipants);
                    }
                }
            }

            private void CreateGroupCourse(GroupCourse proposalGroupCourse, ICollection<SolverParticipant> solverParticipants)
            {
                var results = Enumerable.Range(1, proposalGroupCourse.MaximalBoundedInstructorCount())
                    .Select(i => _solver.Solve(new SolverParam(i, solverParticipants)))
                    .ToArray();

                var committedGroupCourseIds = new List<Guid>();

                foreach (var efficientCourse in EfficientResult(results).Courses)
                {
                    var participantIds = efficientCourse.Participants.Select(p => p.Id).ToArray();

                    var course = _courseCreationService.GetOrCreateGroupCourse(proposalGroupCourse, participantIds, committedGroupCourseIds.ToArray());
                    course.ApplyParticipants(participantIds);
                    course.ApplyInstructor(() =>
                        SelectInstructor(
                            _demandService.GetAvailableInstructorsForGroupCourses(
                                proposalGroupCourse.Discipline, proposalGroupCourse.GetAllCourseDates(_serializationService).ToArray()
                            )
                        )
                    );

                    _unitOfWork.Commit();

                    committedGroupCourseIds.Add(course.Id);
                }

                _courseCreationService.RemoveUnusedButMatchingGroupCourses(proposalGroupCourse, committedGroupCourseIds.ToArray());

                _unitOfWork.Commit();
            }

            private static SolverResult EfficientResult(IEnumerable<SolverResult> results)
            {
                return results.OrderBy(r => r.Courses.Count() * r.Score).First();
            }

            public static Instructor SelectInstructor(IEnumerable<Instructor> availableInstructor)
            {
                var random = new Random();
                return availableInstructor.OrderBy(i => random.Next(0, 100)).FirstOrDefault();
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