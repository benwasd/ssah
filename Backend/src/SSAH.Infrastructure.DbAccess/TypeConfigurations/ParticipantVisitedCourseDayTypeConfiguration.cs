using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class ParticipantVisitedCourseDayTypeConfiguration : IEntityTypeConfiguration<ParticipantVisitedCourseDay>
    {
        public void Configure(EntityTypeBuilder<ParticipantVisitedCourseDay> builder)
        {
            builder.ConfigureEntityBaseProperties();
        }
    }
}