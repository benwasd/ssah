using Autofac;
using Autofac.Features.ResolveAnything;

namespace SSAH.Startup
{
    public static class Bootstrapper
    {
        public static IContainer BootstrapDbAccessContainer()
        {
            var containerBuilder = new ContainerBuilder();
            SSAH.Infrastructure.DbAccess.DependencyRegistry.Configure(containerBuilder);

            containerBuilder.RegisterSource(new AnyConcreteTypeNotAlreadyRegisteredSource());

            return containerBuilder.Build();
        }

        public static IContainer BootstrapContainer()
        {
            var containerBuilder = new ContainerBuilder();
            SSAH.Core.DependencyRegistry.Configure(containerBuilder);
            SSAH.Infrastructure.DependencyRegistry.Configure(containerBuilder);
            SSAH.Infrastructure.Api.DependencyRegistry.Configure(containerBuilder);
            SSAH.Infrastructure.DbAccess.DependencyRegistry.Configure(containerBuilder);
            SSAH.Infrastructure.Solver.DependencyRegistry.Configure(containerBuilder);

            containerBuilder.RegisterSource(new AnyConcreteTypeNotAlreadyRegisteredSource());

            return containerBuilder.Build();
        }
    }
}