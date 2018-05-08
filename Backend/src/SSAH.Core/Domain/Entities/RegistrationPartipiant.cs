using System;
using System.Threading.Tasks;

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

        public Task CommitAsync(Registration registration, int ageGroup, Language language)
        {
            return Task.CompletedTask;
        }

        private Participant ToParticipant(Applicant applicant, int ageGroup, Language language)
        {
            var participant = new Participant();
            participant.ApplicantId = applicant.Id;
            participant.Applicant = applicant;
            participant.Name = Name;
            participant.Language = language;
            participant.AgeGroup = ageGroup;

            ResultingParticipantId = participant.Id;
            ResultingParticipant = participant;

            return participant;
        }
    }
}