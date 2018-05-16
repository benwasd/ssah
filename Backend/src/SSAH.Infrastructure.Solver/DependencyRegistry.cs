using Autofac;

using SSAH.Core.Domain.CourseCreation;

namespace SSAH.Infrastructure.Solver
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            builder.RegisterType<Solver>().As<ISolver>().InstancePerDependency();
        }
    }
}