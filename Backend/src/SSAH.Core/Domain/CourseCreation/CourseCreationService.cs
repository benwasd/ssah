using System;
using System.Linq;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.CourseCreation
{
    public class CourseCreationService : ICourseCreationService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly ISerializationService _serializationService;

        public CourseCreationService(ICourseRepository courseRepository, ISerializationService serializationService)
        {
            _courseRepository = courseRepository;
            _serializationService = serializationService;
        }

        public GroupCourse GetOrCreateProposalGroupCourse(DateTime courseStart, int niveauId, GroupCourseOptions groupCourseOption)
        {
            var course = _courseRepository.GetGroupCourseLocalOrDefault(groupCourseOption.Discipline, CourseStatus.Proposal, niveauId, courseStart, groupCourseOption.Identifier);

            if (course == null)
            {
                course = _courseRepository.GetGroupCourseOrDefault(groupCourseOption.Discipline, CourseStatus.Proposal, niveauId, courseStart, groupCourseOption.Identifier);
            }

            if (course == null)
            {
                course = _courseRepository.CreateAndAddGroupCourse();
                course.Discipline = groupCourseOption.Discipline;
                course.Status = CourseStatus.Proposal;
                course.NiveauId = niveauId;
                course.StartDate = courseStart;
                course.SetPeriodsOptions(_serializationService, groupCourseOption);
            }

            return course;
        }

        public GroupCourse GetOrCreateGroupCourse(GroupCourse proposalGroupCourse, Guid[] participantIds, Guid[] usedGroupCourseIds)
        {
            var groupCourseOption = new GroupCourseOptions
            {
                Identifier = proposalGroupCourse.OptionsIdentifier,
                Discipline = proposalGroupCourse.Discipline,
                Periods = proposalGroupCourse.GetPeriodsOptions(_serializationService)
            };

            var course = _courseRepository.GetBestParticipantIdMatchingGroupCourseOrDefault(
                groupCourseOption.Discipline,
                CourseStatus.Committed,
                proposalGroupCourse.NiveauId,
                proposalGroupCourse.StartDate,
                groupCourseOption.Identifier,
                participantIds,
                excludedGroupCourseIds: usedGroupCourseIds
            );

            if (course == null)
            {
                course = _courseRepository.CreateAndAddGroupCourse();
                course.Discipline = groupCourseOption.Discipline;
                course.Status = CourseStatus.Committed;
                course.NiveauId = proposalGroupCourse.NiveauId;
                course.StartDate = proposalGroupCourse.StartDate;
                course.SetPeriodsOptions(_serializationService, groupCourseOption);
            }

            return course;
        }

        public bool RemoveUnusedButMatchingGroupCourses(GroupCourse proposalGroupCourse, Guid[] usedGroupCourseIds)
        {
            var unusedCourses = _courseRepository.GetMatchingGroupCourses(
                proposalGroupCourse.Discipline,
                CourseStatus.Committed,
                proposalGroupCourse.NiveauId,
                proposalGroupCourse.StartDate,
                proposalGroupCourse.OptionsIdentifier,
                excludedGroupCourseIds: usedGroupCourseIds
            ).ToArray();

            foreach (var unusedCourse in unusedCourses)
            {
                _courseRepository.Remove(unusedCourse);
            }

            return unusedCourses.Any();
        }
    }
}