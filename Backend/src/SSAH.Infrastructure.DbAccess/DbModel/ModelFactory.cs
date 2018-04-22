using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

using SSAH.Infrastructure.DbAccess.TypeConfigurations;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public class ModelFactory : IModelFactory
    {
        public IModel Create()
        {
            var conventions = SqlServerConventionSetBuilder.Build();
            ConfigureConventions(conventions);

            var builder = new ModelBuilder(conventions);
            ConfigureModelBuilder(builder);

            return builder.Model;
        }

        private static void ConfigureConventions(ConventionSet conventions)
        {
        }

        private static void ConfigureModelBuilder(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new CourseTypeConfiguration());
        }
    }
}