using Autofac;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

using Newtonsoft.Json;

using SSAH.Core;
using SSAH.Infrastructure.Api.Hubs;
using SSAH.Infrastructure.Api.Pipeline;

namespace SSAH.Infrastructure.Api
{
    public static class WebApiBootstrapper
    {
        public static void AddSnowSchoolAdministrationHub(this IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc()
                .AddJsonOptions(options => options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore);

            // Add custom controller activator
            services.Replace(ServiceDescriptor.Transient<IControllerActivator, UnitOfWorkControllerActivator>());

            services.AddSignalR();

            // Add custom hub activator
            services.Replace(ServiceDescriptor.Transient<IHubActivator<PingHub>>(x => new AutofacContainerHubActivator<PingHub>(x)));
        }

        public static void UseSnowSchoolAdministrationHub(this IApplicationBuilder app, IHostingEnvironment env, IContainer container)
        {
            app.UseGlobalExceptionHandler();
            app.UseCors(corsPolicyBuilder =>
            {
                corsPolicyBuilder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseScopeMiddleware(container.Resolve<IUnitOfWorkFactory<ILifetimeScope>>());
            app.UseMvc();
            app.UseSignalR(hr => hr.MapHub<PingHub>("/ping"));
        }
    }
}