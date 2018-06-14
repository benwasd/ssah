using System;

namespace SSAH.Core.Messaging
{
    public interface IMessage
    {
        Guid Id { get; set; }
    }
}