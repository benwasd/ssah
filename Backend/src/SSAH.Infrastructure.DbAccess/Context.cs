using Microsoft.EntityFrameworkCore;

using SSAH.Infrastructure.DbAccess.TypeConfigurations;

namespace SSAH.Infrastructure.DbAccess
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) 
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CourseTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ParticipantTypeConfiguration());
        }
    }
}