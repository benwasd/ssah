using System;

namespace SSAH.Core.Messaging
{
    public interface IEvent
    {
        Guid Id { get; set; }
    }
}