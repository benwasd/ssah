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

        public Language? Language { get; set; }

        /// <summary>Jahrgang</summary>
        public int? AgeGroup { get; set; }

        public int? CourseIdentifier { get; set; }

        public DateTime? CourseStartDate { get; set; }

        public Participant ToParticipant(Applicant applicant)
        {
            if (ResultingParticipantId != null)
            {
                throw new InvalidOperationException("This registrastion partipiant already created a partipiant.");
            }

            var participant = new Participant();
            participant.ApplicantId = applicant.Id;
            participant.Applicant = applicant;
            participant.Name = Name;
            participant.Language = Language.Value;
            participant.AgeGroup = AgeGroup.Value;

            ResultingParticipantId = participant.Id;
            ResultingParticipant = participant;

            return participant;
        }
    }
}