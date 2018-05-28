using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain.CourseCreation;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public class Registration : EntityBase
    {
        public Registration()
        {
            RegistrationParticipants = new Collection<RegistrationParticipant>();
        }

        public Guid ApplicantId { get; set; }

        public virtual Applicant Applicant { get; set; }

        public DateTime AvailableFrom { get; set; }

        public DateTime AvailableTo { get; set; }

        public RegistrationStatus Status
        {
            get
            {
                if (RegistrationParticipants.Count == 0)
                {
                    return RegistrationStatus.Registration;
                }

                // Note: Keep condition in sync with RegistrationRepository.GetRegisteredParticipantOverlappingPeriod
                if (RegistrationParticipants.All(rp => rp.ResultingParticipantId.HasValue))
                {
                    return RegistrationStatus.Committed;
                }

                return RegistrationStatus.CourseSelection;
            }
        }

        public virtual ICollection<RegistrationParticipant> RegistrationParticipants { get; set; }

        public IEnumerable<CourseParticipant> AddParticipantsToProposalCourse(IOptions<GroupCourseOptionsCollection> groupCourseOptions, ICourseCreationService courseCreationService)
        {
            foreach (var participant in RegistrationParticipants)
            {
                // TODO: Use damanding service and verify the registration participants 
                var courseOptions = groupCourseOptions.Value.SingleOrDefault(c => c.Match(participant.Discipline, participant.NiveauId) && c.Identifier == participant.CourseIdentifier);
                var course = courseCreationService.GetOrCreateProposalGroupCourse(participant.CourseStartDate.Value, participant.NiveauId, courseOptions);

                var courseParticipant = new CourseParticipant { Participant = participant.ToParticipant(Applicant) };
                course.Participants.Add(courseParticipant);

                yield return courseParticipant;
            }
        }
    }
}