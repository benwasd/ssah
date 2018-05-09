using Autofac;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Demanding;
using SSAH.Core.Messaging;
using SSAH.Core.Services;

namespace SSAH.Core
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            // Domain
            builder.RegisterType<DemandService>().As<IDemandService>().InstancePerDependency();
            builder.RegisterType<EventObserverTest>().As<AutoAttachEventObserverBase>().InstancePerDependency();
            
            // Messaging
            builder.RegisterType<Queue>().As<IQueue>().SingleInstance();
            builder.RegisterType<AutoEventAttacher>().AsSelf().SingleInstance();
            builder.RegisterBuildCallback(c => c.Resolve<AutoEventAttacher>().Start(c));

            // Services
            builder.RegisterType<CourseService>().As<ICourseService>().InstancePerDependency();
        }
    }
}