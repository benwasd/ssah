using System;
using System.Linq;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.DbAccess.Domain
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        private readonly DbSet<GroupCourse> _groupCourseSet;

        public CourseRepository(DbSet<Course> set, DbSet<GroupCourse> groupCourseSet) 
            : base(set)
        {
            _groupCourseSet = groupCourseSet;
        }

        public GroupCourse GetGroupCourseOrDefault(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate, int optionsIdentifier)
        {
            return _groupCourseSet.FirstOrDefault(c => c.Discipline == discipline && c.Status == status && c.NiveauId == niveauId && c.StartDate == startDate && c.OptionsIdentifier == optionsIdentifier);
        }

        public GroupCourse GetGroupCourseLocalOrDefault(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate, int optionsIdentifier)
        {
            return _groupCourseSet.Local.FirstOrDefault(c => c.Discipline == discipline && c.Status == status && c.NiveauId == niveauId && c.StartDate == startDate && c.OptionsIdentifier == optionsIdentifier);
        }

        public GroupCourse CreateAndAddGroupCourse()
        {
            var created = _groupCourseSet.CreateProxy();
            _groupCourseSet.Add(created);

            return created;
        }
    }
}