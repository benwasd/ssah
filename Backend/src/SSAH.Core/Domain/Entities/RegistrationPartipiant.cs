using System;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public class RegistrationPartipiant : EntityBase
    {
        public Guid RegistrationId { get; set; }

        public string Name { get; set; }

        public CourseType CourseType { get; set; }

        public int Niveau { get; set; }

        public Guid? ResultingParticipantId { get; set; }

        public Participant ResultingParticipant { get; set; }
    }
}