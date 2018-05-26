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
                if (this.RegistrationParticipants.Count == 0)
                {
                    return RegistrationStatus.Registration;
                }
                else if (this.RegistrationParticipants.All(rp => rp.ResultingParticipantId.HasValue))
                {
                    return RegistrationStatus.Committed;
                }
                else
                {
                    return RegistrationStatus.CourseSelection;
                }
            }
        }

        public virtual ICollection<RegistrationParticipant> RegistrationParticipants { get; set; }

        public IEnumerable<CourseParticipant> AddParticipantsToProposalCourse(IOptions<GroupCourseOptionsCollection> groupCourseOptions, ICourseCreationService courseCreationService)
        {
            foreach (var registrationParticipant in RegistrationParticipants)
            {
                // TODO: Use damanding service and verify the registration participants 
                var courseOptions = groupCourseOptions.Value.SingleOrDefault(c => c.Identifier == registrationParticipant.CourseIdentifier);
                var course = courseCreationService.GetOrCreateProposalGroupCourse(registrationParticipant.CourseStartDate.Value, registrationParticipant.NiveauId, courseOptions);
                var participant = registrationParticipant.ToParticipant(Applicant);

                var courseParticipant = new CourseParticipant { Participant = participant };
                course.Participants.Add(courseParticipant);

                yield return courseParticipant;
            }
        }
    }
}