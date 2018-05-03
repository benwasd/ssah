using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class CourseParticipantTypeConfiguration : IEntityTypeConfiguration<CourseParticipant>
    {
        public void Configure(EntityTypeBuilder<CourseParticipant> builder)
        {
            builder.ConfigureEntityBaseProperties();
            builder.HasOne(e => e.Participant).WithMany().HasForeignKey(e => e.ParticipantId);
        }
    }
}