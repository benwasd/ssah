using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class InterestRegisteredMessage : MessageBase
    {
        public InterestRegisteredMessage(Guid registrationId)
        {
            RegistrationId = registrationId;
        }

        public Guid RegistrationId { get; }
    }
}