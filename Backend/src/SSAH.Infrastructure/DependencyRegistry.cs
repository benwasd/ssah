using System.IO;

using Autofac;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            builder.Register(_ => BuildConfiguration()).As<IConfiguration>().SingleInstance();
            builder.RegisterGeneric(typeof(OptionsManager<>)).As(typeof(IOptions<>)).InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(OptionsManager<>)).As(typeof(IOptionsSnapshot<>)).InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(OptionsMonitor<>)).As(typeof(IOptionsMonitor<>)).SingleInstance();
            builder.RegisterGeneric(typeof(OptionsFactory<>)).As(typeof(IOptionsFactory<>)).InstancePerDependency();
            builder.RegisterGeneric(typeof(OptionsCache<>)).As(typeof(IOptionsMonitorCache<>)).SingleInstance();
            builder.AddOption<GroupCoursesOptions>("GroupCoursesOptions");
        }

        public static void AddOption<TOptions>(this ContainerBuilder builder, string name)
            where TOptions : class
        {
            builder.Register(c => new ConfigurationChangeTokenSource<TOptions>(name, c.Resolve<IConfiguration>())).As(typeof(IOptionsChangeTokenSource<TOptions>)).SingleInstance();
            builder.Register(c => new ConfigureOptionsFromConfiguration<TOptions>(name, c.Resolve<IConfiguration>())).As(typeof(IConfigureOptions<TOptions>)).SingleInstance();
        }

        private static IConfiguration BuildConfiguration()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();
        }
    }
}