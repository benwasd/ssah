using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace SSAH.Startup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var container = Bootstrapper.BootstrapContainer();

            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
        }
    }
}