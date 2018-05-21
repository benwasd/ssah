using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class RegistrationTypeConfiguration : IEntityTypeConfiguration<Registration>
    {
        public void Configure(EntityTypeBuilder<Registration> builder)
        {
            builder.ConfigureEntityBaseProperties();
            builder.HasOne(p => p.Applicant).WithMany().HasForeignKey(p => p.ApplicantId).IsRequired();
            builder.HasMany(p => p.RegistrationParticipants).WithOne().HasForeignKey(p => p.RegistrationId);
        }
    }
}