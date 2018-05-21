using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;

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

        // TODO: Rename, fix typo
        public bool PreferSimultaneousCourseExecutionForPartipiants { get; set; }

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

        public IEnumerable<CourseParticipant> AddParticipantsToProposalCourse(IOptions<GroupCourseOptionsCollection> groupCourseOptions, ICourseRepository courseRepository, ISerializationService serializationService)
        {
            foreach (var registrationParticipant in RegistrationParticipants)
            {
                var courseOptions = groupCourseOptions.Value.SingleOrDefault(c => c.Identifier == registrationParticipant.CourseIdentifier);
                var course = GetOrCreateProposalGroupCourse(registrationParticipant.CourseStartDate.Value, registrationParticipant.NiveauId, courseOptions, courseRepository, serializationService);
                var participant = registrationParticipant.ToParticipant(Applicant);

                var courseParticipant = new CourseParticipant { Participant = participant };
                course.Participants.Add(courseParticipant);

                yield return courseParticipant;
            }
        }

        private static GroupCourse GetOrCreateProposalGroupCourse(DateTime courseStart, int niveauId, GroupCourseOptions groupCourseOption, ICourseRepository courseRepository, ISerializationService serializationService)
        {
            var course = courseRepository.GetGroupCourseLocalOrDefault(groupCourseOption.Discipline, CourseStatus.Proposal, niveauId, courseStart, groupCourseOption.Identifier);

            if (course == null)
            {
                course = courseRepository.GetGroupCourseOrDefault(groupCourseOption.Discipline, CourseStatus.Proposal, niveauId, courseStart, groupCourseOption.Identifier);
            }

            if (course == null)
            {
                course = courseRepository.CreateAndAddGroupCourse();
                course.Discipline = groupCourseOption.Discipline;
                course.Status = CourseStatus.Proposal;
                course.NiveauId = niveauId;
                course.StartDate = courseStart;
                course.SetPeriodsOptions(serializationService, groupCourseOption);
            }

            return course;
        }
    }
}