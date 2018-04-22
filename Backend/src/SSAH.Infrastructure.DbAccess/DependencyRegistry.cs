using Autofac;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Infrastructure.DbAccess.DbModel;
using SSAH.Infrastructure.DbAccess.Domain;

namespace SSAH.Infrastructure.DbAccess
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            // DbModel
            builder.RegisterType<ContextFactory>().As<IContextFactory>().SingleInstance();
            builder.RegisterType<ModelFactory>().As<IModelFactory>().SingleInstance();

            // Domain
            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>)).InstancePerDependency();

            // UnitOfWork
            builder.RegisterGeneric(typeof(UnitOfWorkFactory<>)).As(typeof(IUnitOfWorkFactory<>)).InstancePerDependency();
            builder.RegisterGeneric(typeof(UnitOfWorkFactory<,>)).As(typeof(IUnitOfWorkFactory<,>)).InstancePerDependency();
            builder.RegisterGeneric(typeof(UnitOfWorkFactory<,,>)).As(typeof(IUnitOfWorkFactory<,,>)).InstancePerDependency();
        }
    }
}