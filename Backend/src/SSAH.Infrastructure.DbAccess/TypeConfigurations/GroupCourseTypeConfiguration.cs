using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class GroupCourseTypeConfiguration : IEntityTypeConfiguration<GroupCourse>
    {
        public void Configure(EntityTypeBuilder<GroupCourse> builder)
        {
            builder.HasBaseType<Course>();
        }
    }
}