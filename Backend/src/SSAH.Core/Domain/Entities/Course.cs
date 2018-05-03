using System;
using System.Collections.Generic;

namespace SSAH.Core.Domain.Entities
{
    public class Course : EntityBase
    {
        public Guid InstructorId { get; set; }

        public virtual Instructor Instructor { get; set; }

        public virtual ICollection<CourseParticipant> Participants { get; set; }
    }
}