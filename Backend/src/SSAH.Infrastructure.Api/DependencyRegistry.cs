using Autofac;

using AutoMapper;

using SSAH.Infrastructure.Api.Hubs;
using SSAH.Infrastructure.Api.Mapping;
using SSAH.Infrastructure.Api.MappingProfiles;

namespace SSAH.Infrastructure.Api
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            // Hubs
            builder.RegisterType<CourseChangeHubQueueBridge>().AsSelf().SingleInstance();

            // Mapping
            builder.RegisterType<MapperFactory>().AsSelf().SingleInstance();
            builder.Register(c => c.Resolve<MapperFactory>().GetMapper(c.Resolve<ILifetimeScope>())).As<IMapper>().InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(CollectionMapper<,>)).As(typeof(ICollectionMapper<,>)).InstancePerDependency();

            // MappingProfiles
            builder.RegisterType<RegistrationMappingProfile>().As<MappingProfileBase>().InstancePerDependency();
            builder.RegisterType<InstructorMappingProfile>().As<MappingProfileBase>().InstancePerDependency();
        }
    }
}