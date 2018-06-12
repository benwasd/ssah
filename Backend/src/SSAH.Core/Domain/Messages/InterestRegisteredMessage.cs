using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class InterestRegisteredChangedMessage : MessageBase, IInterestRegisteredChangeMessage
    {
        public InterestRegisteredChangedMessage(Guid registrationId)
        {
            RegistrationId = registrationId;
        }

        public Guid RegistrationId { get; }
    }
}