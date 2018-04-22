using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public class ModelFactory : IModelFactory
    {
        public IModel Create()
        {
            var conventions = new ConventionSet();
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
            builder.Entity<Course>().HasKey(p => p.Id);
            builder.Entity<Course>().Property(p => p.Lol);
        }
    }
}