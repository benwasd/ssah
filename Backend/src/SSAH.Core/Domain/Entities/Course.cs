using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

using SSAH.Core.Collections;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;

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

        public void ApplyParticipants(Guid[] newParticipantIds)
        {
            var delta = CollectionDeltaCalculator.CalculateCollectionDelta(newParticipantIds, Participants, s => s, d => d.ParticipantId);
            delta.Added.ForEach(a => Participants.Add(new CourseParticipant { ParticipantId = a, CourseId = Id }));
            delta.Removed.ForEach(r => Participants.Remove(r));
        }

        public void ApplyInstructor(Func<Instructor> newInstructorResolver)
        {
            if (InstructorId == null)
            {
                var newInstructor = newInstructorResolver();
                InstructorId = newInstructor?.Id;
                Instructor = newInstructor;
            }
        }

        public void Close(Guid[] passedParticipantIds, ISerializationService serializationService)
        {
            if (Status != CourseStatus.Committed)
            {
                throw new InvalidOperationException("Only committed courses can be closed.");
            }

            AddVisitedDaysToPassedParticipants(passedParticipantIds, serializationService);

            Status = CourseStatus.Closed;
        }

        public DateTime StartDate { get; set; }

        public int MaximalBoundedInstructorCount()
        {
            if (Status != CourseStatus.Proposal)
            {
                throw new InvalidOperationException("This calculation is only available for proposal courses.");
            }

            return EvaluateMaximalBoundedInstructorCount();
        }

        protected abstract int EvaluateMaximalBoundedInstructorCount();

        protected abstract void AddVisitedDaysToPassedParticipants(Guid[] passedParticipantIds, ISerializationService serializationService);
    }
}