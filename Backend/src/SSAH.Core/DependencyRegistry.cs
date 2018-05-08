using Autofac;

using SSAH.Core.Domain.Demanding;
using SSAH.Core.Services;

namespace SSAH.Core
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            // Domain
            builder.RegisterType<DemandService>().As<IDemandService>().InstancePerDependency();

            // Services
            builder.RegisterType<CourseService>().As<ICourseService>().InstancePerDependency();
        }
    }
}