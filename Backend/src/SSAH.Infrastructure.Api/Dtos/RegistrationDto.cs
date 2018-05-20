using System;
using System.Collections.Generic;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class RegistrationDto
    {
        public Guid? RegistrationId { get; set; }

        public Guid? ApplicantId { get; set; }

        public string Surname { get; set; }

        public string Givenname { get; set; }

        public string Residence { get; set; }

        public string PhoneNumber { get; set; }

        public bool PreferSimultaneousCourseExecutionForPartipiants { get; set; }

        public DateTime AvailableFrom { get; set; }

        public DateTime AvailableTo { get; set; }

        public ICollection<RegistrationParticipantDto> Participants { get; set; }
    }
}