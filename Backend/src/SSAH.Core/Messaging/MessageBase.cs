using System;

namespace SSAH.Core.Messaging
{
    public class MessageBase : IMessage
    {
        public MessageBase()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
    }
}