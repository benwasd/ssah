using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess.TypeConfigurations
{
    public class NotificationEntryTypeConfiguration : IEntityTypeConfiguration<NotificationEntry>
    {
        public void Configure(EntityTypeBuilder<NotificationEntry> builder)
        {
            builder.ConfigureEntityBaseProperties();
        }
    }
}