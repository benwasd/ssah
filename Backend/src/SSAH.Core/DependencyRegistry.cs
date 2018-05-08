using Autofac;

using SSAH.Core.Services;

namespace SSAH.Core
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            // Services
            builder.RegisterType<DemandService>().As<IDemandService>().InstancePerDependency();
            builder.RegisterType<CourseService>().As<ICourseService>().InstancePerDependency();
        }
    }
}