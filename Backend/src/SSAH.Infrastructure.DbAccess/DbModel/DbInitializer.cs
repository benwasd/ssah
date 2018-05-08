using System.Collections.Generic;

using Autofac;

using SSAH.Core;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public static class DbInitializer
    {
        public static void Initialize(IContainer rootContainer)
        {
            var unitOfWorkFactory = rootContainer.Resolve<IUnitOfWorkFactory<Context, IEnumerable<IDbSeeder>>>();

            using (var unitOfWork = unitOfWorkFactory.Begin())
            {
                unitOfWork.Dependent.Database.EnsureDeleted();
                unitOfWork.Dependent.Database.EnsureCreated();
            }

            using (var unitOfWork = unitOfWorkFactory.Begin())
            {
                foreach (var seeder in unitOfWork.Dependent2)
                {
                    seeder.Seed();
                }
            }
        }
    }
}