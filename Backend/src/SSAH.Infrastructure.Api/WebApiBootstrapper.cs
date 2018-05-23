using Autofac;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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
            services.AddMvc().AddJsonOptions(ConfigureJsonSerializer);
            services.AddSignalR();

            // Add custom controller and hub activator
            services.Replace(ServiceDescriptor.Transient<IControllerActivator, UnitOfWorkControllerActivator>());
            services.Replace(ServiceDescriptor.Transient<IHubActivator<CourseChangeHub>>(p => new AutofacContainerHubActivator<CourseChangeHub>(p)));
        }

        public static void UseSnowSchoolAdministrationHub(this IApplicationBuilder app, IHostingEnvironment env, IContainer container)
        {
            app.UseScopeMiddleware(container.Resolve<IUnitOfWorkFactory<ILifetimeScope>>());
            app.UseGlobalExceptionHandler();
            app.UseCors(ConfigureCorsUsage);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
            app.UseSignalR(ConfigureSignalRUsage);
        }

        private static void ConfigureJsonSerializer(MvcJsonOptions options)
        {
            options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
            options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
            options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
        }

        private static void ConfigureCorsUsage(CorsPolicyBuilder builder)
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }

        public static void ConfigureSignalRUsage(HubRouteBuilder routeBuilder)
        {
            routeBuilder.MapHub<CourseChangeHub>("/courseChange");
        }
    }
}