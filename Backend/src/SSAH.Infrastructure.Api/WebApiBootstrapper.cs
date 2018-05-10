using Autofac;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

using Newtonsoft.Json;

using SSAH.Core;
using SSAH.Infrastructure.Api.Pipeline;

namespace SSAH.Infrastructure.Api
{
    public static class WebApiBootstrapper
    {
        public static void AddSnowSchoolAdministrationHub(this IServiceCollection services)
        {
            var mvcBuilder = services.AddMvc();

            // Add custoim controller activator
            mvcBuilder.Services.Replace(ServiceDescriptor.Transient<IControllerActivator, UnitOfWorkControllerActivator>());
            mvcBuilder.AddJsonOptions(options => options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore);
        }

        public static void UseSnowSchoolAdministrationHub(this IApplicationBuilder app, IHostingEnvironment env, IContainer container)
        {
            app.UseGlobalExceptionHandler();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseScopeMiddleware(container.Resolve<IUnitOfWorkFactory<ILifetimeScope>>());
            app.UseMvc();
        }
    }
}