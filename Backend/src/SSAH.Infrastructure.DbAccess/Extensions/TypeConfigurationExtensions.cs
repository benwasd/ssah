using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.DbAccess.Extensions
{
    public static class TypeConfigurationExtensions
    {
        public static void ConfigureEntityBaseProperties<T>(this EntityTypeBuilder<T> builder)
            where T : EntityBase
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.RowVersion).HasColumnType("timestamp").IsConcurrencyToken();
        }
    }
}