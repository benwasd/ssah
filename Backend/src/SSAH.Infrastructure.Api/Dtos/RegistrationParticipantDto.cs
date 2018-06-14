using System.Collections.Generic;

using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class RegistrationParticipantDto : EntityDto
    {
        public string Name { get; set; }

        public CourseType CourseType { get; set; }

        public Discipline Discipline { get; set; }

        public int NiveauId { get; set; }

        public Language? Language { get; set; }

        /// <summary>Jahrgang</summary>
        public int? AgeGroup { get; set; }

        public ICollection<Period> CommittedCoursePeriods { get; set; }
    }
}