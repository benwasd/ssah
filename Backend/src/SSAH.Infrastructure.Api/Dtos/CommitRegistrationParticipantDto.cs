using System;

using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class CommitRegistrationParticipantDto
    {
        public Guid RegistrationParticipantId { get; set; }

        public Language Language { get; set; }

        /// <summary>Jahrgang</summary>
        public int AgeGroup { get; set; }

        // TODO: Add course reference
    }
}