using System.IO;

using Autofac;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace SSAH.Startup
{
    public class Program
    {
        private static IContainer s_rootContainer;

        public static void Main(string[] args)
        {
            s_rootContainer = Bootstrapper.BootstrapContainer();

            CreateDefaultBuilder(args)
                .ConfigureServices(services => services.AddSingleton(s_rootContainer))
                .UseStartup<Startup>()
                .Build()
                .Run();
        }

        public static IWebHostBuilder CreateDefaultBuilder(string[] args)
        {
            var builder = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                //.ConfigureAppConfiguration((hostingContext, config) =>
                //{
                //    var env = hostingContext.HostingEnvironment;

                //    config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                //          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);

                //    if (env.IsDevelopment())
                //    {
                //        var appAssembly = Assembly.Load(new AssemblyName(env.ApplicationName));
                //        if (appAssembly != null)
                //        {
                //            config.AddUserSecrets(appAssembly, optional: true);
                //        }
                //    }

                //    config.AddEnvironmentVariables();

                //    if (args != null)
                //    {
                //        config.AddCommandLine(args);
                //    }
                //})
                //.ConfigureLogging((hostingContext, logging) =>
                //{
                //    logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                //    logging.AddConsole();
                //    logging.AddDebug();
                //})
                //.ConfigureServices((hostingContext, services) =>
                //{
                //    // Fallback
                //    services.PostConfigure<HostFilteringOptions>(options =>
                //    {
                //        if (options.AllowedHosts == null || options.AllowedHosts.Count == 0)
                //        {
                //            // "AllowedHosts": "localhost;127.0.0.1;[::1]"
                //            var hosts = hostingContext.Configuration["AllowedHosts"]?.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                //            // Fall back to "*" to disable.
                //            options.AllowedHosts = (hosts?.Length > 0 ? hosts : new[] { "*" });
                //        }
                //    });
                //    // Change notification
                //    services.AddSingleton<IOptionsChangeTokenSource<HostFilteringOptions>>(
                //        new ConfigurationChangeTokenSource<HostFilteringOptions>(hostingContext.Configuration));

                //    services.AddTransient<IStartupFilter, HostFilteringStartupFilter>();
                //})
                .UseIISIntegration()
                .UseDefaultServiceProvider((context, options) =>
                {
                    options.ValidateScopes = context.HostingEnvironment.IsDevelopment();
                });

            //if (args != null)
            //{
            //    builder.UseConfiguration(new ConfigurationBuilder().AddCommandLine(args).Build());
            //}

            return builder;
        }
    }
}