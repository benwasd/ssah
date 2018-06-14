using System;
using System.Reactive.Concurrency;

namespace SSAH.Core.Messaging
{
    public interface IQueue : IObservable<IMessage>
    {
        void Publish(IMessage message);

        IScheduler Scheduler { get; }
    }
}