using System;

namespace SSAH.Core.Messaging
{
    public interface IQueue : IObservable<IMessage>
    {
        void Publish(IMessage message);
    }
}