using System;

namespace SSAH.Core.Messaging
{
    public class EventBase : IEvent
    {
        public EventBase()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
    }
}