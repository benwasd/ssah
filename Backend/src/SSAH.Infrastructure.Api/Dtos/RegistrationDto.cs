using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Objects;

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

        public bool PreferSimultaneousCourseExecutionForParticipants { get; set; }

        public DateTime AvailableFrom { get; set; }

        public DateTime AvailableTo { get; set; }

        public RegistrationStatus Status { get; set; }

        public ICollection<RegistrationParticipantDto> Participants { get; set; }
    }
}