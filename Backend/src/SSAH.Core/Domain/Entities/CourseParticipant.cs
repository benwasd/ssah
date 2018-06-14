using System;

namespace SSAH.Core.Domain.Entities
{
    public class CourseParticipant : EntityBase
    {
        public Guid CourseId { get; set; }

        public Guid ParticipantId { get; set; }

        public virtual Participant Participant { get; set; }
    }
}