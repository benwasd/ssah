using System;

using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class CommitRegistrationParticipantDto : EntityDto
    {
        public Language Language { get; set; }

        /// <summary>Jahrgang</summary>
        public int AgeGroup { get; set; }

        public int CourseIdentifier { get; set; }

        public DateTime CourseStartDate { get; set; }
    }
}