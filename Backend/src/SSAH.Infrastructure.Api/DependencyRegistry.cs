using Autofac;

namespace SSAH.Infrastructure.Api
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
        }

        // TODO: Remove
        public static IContainer Container { get; set; }
    }
}