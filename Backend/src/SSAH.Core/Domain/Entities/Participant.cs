using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace SSAH.Core.Domain.Entities
{
    public class Participant : EntityBase
    {
        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string Name { get; set; }
    }

    public class CourseParticipant : EntityBase
    {
        public Guid CourseId { get; set; }

        public Guid ParticipantId { get; set; }

        public virtual Participant Participant { get; set; }
    }
}