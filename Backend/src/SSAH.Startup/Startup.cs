using Autofac;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

using SSAH.Infrastructure.Api;

namespace SSAH.Startup
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSnowSchoolAdministrationHub();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IContainer rootContainer)
        {
            app.UseSnowSchoolAdministrationHub(env, rootContainer);
        }
    }
}