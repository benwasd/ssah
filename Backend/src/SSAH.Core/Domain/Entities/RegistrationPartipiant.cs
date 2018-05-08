using System;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public class RegistrationPartipiant : EntityBase
    {
        public Guid RegistrationId { get; set; }

        public string Name { get; set; }

        public CourseType CourseType { get; set; }

        public Discipline Discipline { get; set; }

        public int NiveauId { get; set; }

        public Guid? ResultingParticipantId { get; set; }

        public virtual Participant ResultingParticipant { get; set; }
    }
}