using System;

namespace SSAH.Core.Domain.Entities
{
    public class ParticipantCompletedNiveau : EntityBase
    {
        public Guid ParticipantId { get; set; }

        public int NiveauId { get; set; }

        public string NiveauName { get; set; }
    }
}