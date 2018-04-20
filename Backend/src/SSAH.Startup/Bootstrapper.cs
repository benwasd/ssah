using Autofac;

namespace SSAH.Startup
{
    public static class Bootstrapper
    {
        public static IContainer BootstrapContainer()
        {
            var containerBuilder = new ContainerBuilder();
            SSAH.Core.DependencyRegistry.Configure(containerBuilder);
            SSAH.Infrastructure.DependencyRegistry.Configure(containerBuilder);
            SSAH.Infrastructure.Api.DependencyRegistry.Configure(containerBuilder);
            SSAH.Infrastructure.DbAccess.DependencyRegistry.Configure(containerBuilder);

            return containerBuilder.Build();
        }
    }
}