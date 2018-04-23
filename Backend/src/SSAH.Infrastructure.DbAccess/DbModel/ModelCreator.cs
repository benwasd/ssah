using Microsoft.EntityFrameworkCore;

using SSAH.Infrastructure.DbAccess.TypeConfigurations;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public class ModelCreator : IModelCreator
    {
        public void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new CourseTypeConfiguration());
            builder.ApplyConfiguration(new ParticipantTypeConfiguration());
        }
    }
}