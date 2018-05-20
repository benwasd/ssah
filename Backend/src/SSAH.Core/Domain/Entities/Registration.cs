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
            RegistrationPartipiant = new Collection<RegistrationPartipiant>();
        }

        public Guid ApplicantId { get; set; }

        public virtual Applicant Applicant { get; set; }

        public bool PreferSimultaneousCourseExecutionForPartipiants { get; set; }

        public DateTime AvailableFrom { get; set; }

        public DateTime AvailableTo { get; set; }

        public virtual ICollection<RegistrationPartipiant> RegistrationPartipiant { get; set; }

        public IEnumerable<CourseParticipant> AddPartipiantsToProposalCourse(IOptions<GroupCourseOptionsCollection> groupCourseOptions, ICourseRepository courseRepository, ISerializationService serializationService)
        {
            foreach (var registrationPartipiant in RegistrationPartipiant)
            {
                var courseOptions = groupCourseOptions.Value.SingleOrDefault(c => c.Identifier == registrationPartipiant.CourseIdentifier);
                var course = GetOrCreateProposalGroupCourse(registrationPartipiant.CourseStartDate.Value, registrationPartipiant.NiveauId, courseOptions, courseRepository, serializationService);
                var partipiant = registrationPartipiant.ToParticipant(Applicant);

                var courseParticipant = new CourseParticipant { Participant = partipiant };
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