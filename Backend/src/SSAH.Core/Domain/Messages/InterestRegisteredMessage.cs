using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class InterestRegisteredChangedMessage : MessageBase
    {
        public InterestRegisteredChangedMessage(Guid registrationId, bool canceled = false)
        {
            RegistrationId = registrationId;
            Canceled = canceled;
        }

        public Guid RegistrationId { get; }

        public bool Canceled { get; }
    }
}