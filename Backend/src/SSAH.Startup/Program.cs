using System.IO;

using Autofac;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

using SSAH.Infrastructure.DbAccess.DbModel;

namespace SSAH.Startup
{
    public class Program
    {
        private static IContainer s_dbAccesssContainer;
        private static IContainer s_rootContainer;

        public static void Main(string[] args)
        {
            s_dbAccesssContainer = Bootstrapper.BootstrapDbAccessContainer();

            DbInitializer.Initialize(s_dbAccesssContainer);

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
                .UseIISIntegration()
                .UseDefaultServiceProvider((context, options) =>
                {
                    options.ValidateScopes = context.HostingEnvironment.IsDevelopment();
                });

            return builder;
        }
    }
}