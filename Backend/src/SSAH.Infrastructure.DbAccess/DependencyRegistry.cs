using Autofac;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Infrastructure.DbAccess.DbModel;
using SSAH.Infrastructure.DbAccess.Domain;
using SSAH.Infrastructure.DbAccess.Domain.Seeder;

namespace SSAH.Infrastructure.DbAccess
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            // DbModel
            builder.RegisterType<ContextOptionsProvider>().As<IContextOptionsProvider>().InstancePerDependency();
            builder.RegisterType<ModelCreator>().As<IModelCreator>().InstancePerDependency();

            // Domain
            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>)).InstancePerDependency();
            builder.RegisterType<CourseRepository>().As<ICourseRepository>().InstancePerDependency();
            builder.RegisterType<RegistrationRepository>().As<IRegistrationRepository>().InstancePerDependency();
            builder.RegisterType<SeasonRepository>().As<ISeasonRepository>().InstancePerDependency();

            // Domain Seeder
            builder.RegisterType<SeasonSeeder>().As<IDbSeeder>().InstancePerDependency();
            builder.RegisterType<InstructorSeeder>().As<IDbSeeder>().InstancePerDependency();

            // UnitOfWork
            builder.RegisterGeneric(typeof(UnitOfWorkFactory<>)).As(typeof(IUnitOfWorkFactory<>)).InstancePerDependency();
            builder.RegisterGeneric(typeof(UnitOfWorkFactory<,>)).As(typeof(IUnitOfWorkFactory<,>)).InstancePerDependency();
            builder.RegisterGeneric(typeof(UnitOfWorkFactory<,,>)).As(typeof(IUnitOfWorkFactory<,,>)).InstancePerDependency();
        }
    }
}