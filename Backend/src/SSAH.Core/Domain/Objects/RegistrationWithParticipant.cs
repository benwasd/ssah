using SSAH.Core.Domain.Entities;

namespace SSAH.Core.Domain.Objects
{
    public class RegistrationWithParticipant
    {
        public Registration Registration { get; set; }

        public RegistrationParticipant RegistrationParticipant { get; set; }
    }
}