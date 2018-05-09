using System;

namespace SSAH.Core.Messaging
{
    public interface IQueue : IObservable<IEvent>
    {
        void Publish(IEvent @event);
    }
}