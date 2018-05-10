using System;
using System.Collections.Generic;
using System.Reactive;
using System.Reactive.Linq;

using Autofac;

using SSAH.Core.Extensions;
using SSAH.Core.Messaging;

namespace SSAH.Core.Domain
{
    public class MessageObserverTest : AutoAttachMessageObserverBase
    {
        protected override IEnumerable<IDisposable> SetupCore(IQueue queue, IContainer rootContainer)
        {
            yield return queue
                .Where(r => r.Id == Guid.Empty)
                .SubscribeInUnitOfWorkScope<IMessage, Handler>(rootContainer);
        }

        public class Handler : ObserverBase<IMessage>
        {
            private readonly ISeasonRepository _seasonRepository;

            public Handler(ISeasonRepository seasonRepository)
            {
                _seasonRepository = seasonRepository;
            }

            protected override void OnNextCore(IMessage value)
            {
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