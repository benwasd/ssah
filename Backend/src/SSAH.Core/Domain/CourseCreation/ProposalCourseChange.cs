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

            //yield return Observable.Timer(TimeSpan.FromSeconds(2))
            //    .Subscribe(x => queue.Publish(new PartipiantRegistredMessage(Guid.NewGuid(), Guid.Empty)));
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
                //var x = _courseRepository.GetById(value.ProposalCourseId);
                //var solverParticipants = x.Participants.Select(p => new SolverParticipant(p.Participant)).ToArray();

                //var result = _solver.Solve(new SolverParam(5, solverParticipants));
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