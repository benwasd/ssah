﻿using Autofac;

using SSAH.Core.Domain.CourseCreation;
using SSAH.Core.Domain.Demanding;
using SSAH.Core.Domain.Messages;
using SSAH.Core.Messaging;

namespace SSAH.Core
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            // Domain
            builder.RegisterType<CourseCreationService>().As<ICourseCreationService>().InstancePerDependency();
            builder.RegisterType<DemandService>().As<IDemandService>().InstancePerDependency();
            builder.RegisterType<MessageObserverTest>().As<AutoAttachMessageObserverBase>().InstancePerDependency();
            builder.RegisterType<CreateCourses>().As<AutoAttachMessageObserverBase>().InstancePerDependency();
            
            // Messaging
            builder.RegisterType<Queue>().As<IQueue>().SingleInstance();
            builder.RegisterType<AutoMessageObserverAttacher>().AsSelf().SingleInstance();
            builder.RegisterBuildCallback(c => c.Resolve<AutoMessageObserverAttacher>().Start(c));
        }
    }
}