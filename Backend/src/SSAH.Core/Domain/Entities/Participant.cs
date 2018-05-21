using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public class Participant : EntityBase
    {
        public Participant()
        {
            VisitedCourseDays = new Collection<ParticipantVisitedCourseDay>();
        }

        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string Name { get; set; }

        public Guid ApplicantId { get; set; }

        public virtual Applicant Applicant { get; set; }

        public Language Language { get; set; }

        /// <summary>Jahrgang</summary>
        public int AgeGroup { get; set; }

        public virtual ICollection<ParticipantVisitedCourseDay> VisitedCourseDays { get; set; }
    }
}