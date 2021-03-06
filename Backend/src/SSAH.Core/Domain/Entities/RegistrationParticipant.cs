﻿using System;
using System.ComponentModel.DataAnnotations;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public class RegistrationParticipant : EntityBase
    {
        public Guid RegistrationId { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
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

        public bool HasDemandWhenLastCreatedOrModified { get; set; }

        public Participant ToParticipant(Applicant applicant)
        {
            if (ResultingParticipantId != null)
            {
                throw new InvalidOperationException("This registrastion participant already created a participant.");
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