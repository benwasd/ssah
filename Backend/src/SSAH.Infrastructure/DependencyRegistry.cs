using System.IO;

using Autofac;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Debug;
using Microsoft.Extensions.Options;

using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;
using SSAH.Infrastructure.Services;

namespace SSAH.Infrastructure
{
    public static class DependencyRegistry
    {
        public static void Configure(ContainerBuilder builder)
        {
            // Configuration
            builder.Register(_ => BuildConfiguration()).As<IConfiguration>().SingleInstance();
            builder.RegisterGeneric(typeof(OptionsManager<>)).As(typeof(IOptions<>)).InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(OptionsManager<>)).As(typeof(IOptionsSnapshot<>)).InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(OptionsMonitor<>)).As(typeof(IOptionsMonitor<>)).SingleInstance();
            builder.RegisterGeneric(typeof(OptionsFactory<>)).As(typeof(IOptionsFactory<>)).InstancePerDependency();
            builder.RegisterGeneric(typeof(OptionsCache<>)).As(typeof(IOptionsMonitorCache<>)).SingleInstance();
            builder.AddOption<GroupCourseOptionsCollection>(GroupCourseOptionsCollection.NAME);
            builder.AddOption<DemandingThresholdOptions>(DemandingThresholdOptions.NAME);
            builder.AddOption<SmsGatewayOptions>(SmsGatewayOptions.NAME);

            // Logger
            builder.RegisterType<LoggerFactory>().UsingConstructor(typeof(System.Collections.Generic.IEnumerable<ILoggerProvider>), typeof(IOptionsMonitor<LoggerFilterOptions>)).As<ILoggerFactory>().SingleInstance();
            builder.RegisterType<DebugLoggerProvider>().As<ILoggerProvider>().SingleInstance();
            builder.RegisterGeneric(typeof(Logger<>)).As(typeof(ILogger<>));

            // Services
            builder.RegisterType<JsonSerializationService>().As<ISerializationService>().InstancePerDependency();
            builder.RegisterType<NotificationService>().As<INotificationService>().InstancePerDependency();
            builder.RegisterType<PhoneNumberService>().As<IPhoneNumberService>().InstancePerDependency();
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
                .AddJsonFile("appsettings.custom.json", optional: true, reloadOnChange: true)
                .Build();
        }
    }
}