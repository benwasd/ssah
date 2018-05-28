using System;

namespace SSAH.Core.Domain.Messages
{
    public interface IInterestRegisteredChangeMessage
    {
        Guid RegistrationId { get; }

        bool Canceled { get; }
    }
}