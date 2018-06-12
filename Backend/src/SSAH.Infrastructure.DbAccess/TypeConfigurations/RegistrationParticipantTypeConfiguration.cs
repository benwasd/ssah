using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class RegistrationParticipantTypeConfiguration : IEntityTypeConfiguration<RegistrationParticipant>
    {
        public void Configure(EntityTypeBuilder<RegistrationParticipant> builder)
        {
            builder.ConfigureEntityBaseProperties();
            builder.HasOne(p => p.ResultingParticipant).WithMany().HasForeignKey(p => p.ResultingParticipantId).OnDelete(DeleteBehavior.ClientSetNull).IsRequired(false);
        }
    }
}