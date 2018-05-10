﻿using Microsoft.EntityFrameworkCore;
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
            builder.HasOne(p => p.Applicant).WithMany().HasForeignKey(p => p.ApplicantId).IsRequired();
            builder.HasMany(p => p.CompletedNiveaus).WithOne().HasForeignKey(p => p.ParticipantId);
        }
    }
}