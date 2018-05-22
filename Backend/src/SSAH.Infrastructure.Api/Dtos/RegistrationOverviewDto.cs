using System;

using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class RegistrationOverviewDto
    {
        public Guid RegistrationId { get; set; }

        public DateTime AvailableFrom { get; set; }

        public DateTime AvailableTo { get; set; }

        public RegistrationStatus Status { get; set; }

        public string ParticipantNames { get; set; }
    }
}