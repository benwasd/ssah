using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class CourseTypeConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.ConfigureEntityBaseProperties();
            builder.HasOne(e => e.Instructor).WithMany().HasForeignKey(e => e.InstructorId).IsRequired();
            builder.HasMany(e => e.Participants).WithOne().HasForeignKey(e => e.CourseId).IsRequired();
        }
    }
}