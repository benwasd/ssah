using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public abstract class Course : EntityBase
    {
        protected Course()
        {
            Participants = new Collection<CourseParticipant>();
        }

        protected Course(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate)
            : this()
        {
            Discipline = discipline;
            Status = status;
            NiveauId = niveauId;
            StartDate = startDate;
        }

        public Discipline Discipline { get; set; }

        public Guid? InstructorId { get; set; }

        public virtual Instructor Instructor { get; set; }

        public CourseStatus Status { get; set; }

        public int NiveauId { get; set; }

        public virtual ICollection<CourseParticipant> Participants { get; set; }

        public DateTime StartDate { get; set; }

        public int MaximalBoundedInstructorCount()
        {
            if (Status != CourseStatus.Proposal)
            {
                throw new InvalidOperationException("This calculation is only available for proposal courses.");
            }

            return MaximalBoundedInstructorCountCore();
        }

        protected abstract int MaximalBoundedInstructorCountCore();
    }
}