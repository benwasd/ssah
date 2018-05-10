using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class ParticipantCompletedNiveauTypeConfiguration : IEntityTypeConfiguration<ParticipantCompletedNiveau>
    {
        public void Configure(EntityTypeBuilder<ParticipantCompletedNiveau> builder)
        {
            builder.ConfigureEntityBaseProperties();
        }
    }
}