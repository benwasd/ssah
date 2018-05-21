using System;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.CourseCreation
{
    public interface ICourseCreationService
    {
        GroupCourse GetOrCreateProposalGroupCourse(DateTime courseStart, int niveauId, GroupCourseOptions groupCourseOption);

        GroupCourse GetOrCreateGroupCourse(GroupCourse proposalGroupCourse, Guid[] participantIds, Guid[] usedGroupCourseIds);

        void RemoveUnusedButMatchingGroupCourses(GroupCourse proposalGroupCourse, Guid[] usedGroupCourseIds);
    }
}