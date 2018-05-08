using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.DbAccess.Domain
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        public CourseRepository(DbSet<Course> set) 
            : base(set)
        {
        }
    }
}