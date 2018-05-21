using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain
{
    public interface ICourseRepository : IRepository<Course>
    {
        GroupCourse GetGroupCourseOrDefault(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate, int optionsIdentifier);

        GroupCourse GetGroupCourseLocalOrDefault(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate, int optionsIdentifier);

        IEnumerable<GroupCourse> GetAllGroupCourses(Guid instructorId, CourseStatus status);

        Task<IEnumerable<GroupCourse>> GetAllGroupCourses(Guid instructorId, CourseStatus status, DateTime from, DateTime to);
        
        GroupCourse CreateAndAddGroupCourse();
    }
}