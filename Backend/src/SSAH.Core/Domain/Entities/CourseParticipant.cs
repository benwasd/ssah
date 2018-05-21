using System;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public class CourseParticipant : EntityBase
    {
        public Guid CourseId { get; set; }

        public Guid ParticipantId { get; set; }

        public virtual Participant Participant { get; set; }

        // Allow adding of proposaed Participants?
        // public CourseStatus Status { get; set; }
    }
}