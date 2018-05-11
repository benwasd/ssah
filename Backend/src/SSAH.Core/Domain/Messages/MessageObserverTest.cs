using System;
using System.Collections.Generic;
using System.Reactive;
using System.Reactive.Linq;

using Autofac;

using SSAH.Core.Extensions;
using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class MessageObserverTest : AutoAttachMessageObserverBase
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

            public Handler(ICourseRepository courseRepository)
            {
                _courseRepository = courseRepository;
            }

            protected override void OnNextCore(PartipiantRegistredMessage value)
            {
                var course = _courseRepository.GetById(value.ProposalCourseId);
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