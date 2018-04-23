using System;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class ParticipantTypeConfiguration : IEntityTypeConfiguration<Participant>
    {
        public void Configure(EntityTypeBuilder<Participant> builder)
        {
            builder.ConfigureEntityBaseProperties();
            builder.Property(p => p.Name);

            builder.HasData(new Participant { CreatedBy = "System", CreatedOn = DateTimeOffset.Now, Name = "Benjamin" });
            builder.HasData(new Participant { CreatedBy = "System", CreatedOn = DateTimeOffset.Now, Name = "Andrina" });
            builder.HasData(new Participant { CreatedBy = "System", CreatedOn = DateTimeOffset.Now, Name = "Lukas" });
        }
    }
}