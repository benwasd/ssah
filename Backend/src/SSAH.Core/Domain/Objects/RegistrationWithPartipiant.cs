using SSAH.Core.Domain.Entities;

namespace SSAH.Core.Domain.Objects
{
    public class RegistrationWithPartipiant
    {
        public Registration Registration { get; set; }

        public RegistrationPartipiant RegistrationPartipiant { get; set; }
    }
}