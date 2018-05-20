using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;

using Autofac;

using SSAH.Core.Domain.Messages;
using SSAH.Core.Extensions;
using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.CourseCreation
{
    public class ProposalCourseChange : AutoAttachMessageObserverBase
    {
        protected override IEnumerable<IDisposable> SetupCore(IQueue queue, IContainer rootContainer)
        {
            yield return queue
                .OfType<PartipiantRegistredMessage>()
                .SubscribeInUnitOfWorkScope<PartipiantRegistredMessage, Handler>(rootContainer);
        }

        public class Handler : ObserverBase<PartipiantRegistredMessage>
        {
            private readonly ICourseRepository _courseRepository;
            private readonly ISolver _solver;

            public Handler(ICourseRepository courseRepository, ISolver solver)
            {
                _courseRepository = courseRepository;
                _solver = solver;
            }

            protected override void OnNextCore(PartipiantRegistredMessage value)
            {
                var x = _courseRepository.GetById(value.ProposalCourseId);
                var solverParticipants = x.Participants.Select(p => new SolverParticipant(p.Participant)).ToArray();

                var result1Course = _solver.Solve(new SolverParam(1, solverParticipants));
                var result2Courses = _solver.Solve(new SolverParam(2, solverParticipants));
                var result3Courses = _solver.Solve(new SolverParam(3, solverParticipants));
                var result4Courses = _solver.Solve(new SolverParam(4, solverParticipants));
                var result5Courses = _solver.Solve(new SolverParam(5, solverParticipants));
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