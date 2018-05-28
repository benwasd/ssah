using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class InterestRegisteredMessage : MessageBase, IInterestRegisteredChangeMessage
    {
        public InterestRegisteredMessage(Guid registrationId)
        {
            RegistrationId = registrationId;
        }

        public Guid RegistrationId { get; }

        public bool Canceled => false;
    }
}