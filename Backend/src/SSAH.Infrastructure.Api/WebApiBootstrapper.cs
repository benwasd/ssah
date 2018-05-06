using Autofac;

using Microsoft.AspNetCore.Builder;

using SSAH.Core;
using SSAH.Infrastructure.Api.Pipeline;

namespace SSAH.Infrastructure.Api
{
    public static class WebApiBootstrapper
    {
        public static void UseSnowSchoolAdministrationHub(this IApplicationBuilder app,IContainer container)
        {
            app.UseGlobalExceptionHandler();
            app.UseScopeMiddleware(container.Resolve<IUnitOfWorkFactory<ILifetimeScope>>());
            //app.UseRequestId();
            //app.UseMiloAuth(ConfigureAuth());
            //app.UseWebApi(ConfigureWebApi(container));
        }

        //private static CookieAuthenticationOptions ConfigureAuth()
        //{
        //    var options = new CookieAuthenticationOptions();

        //    // AuthConfig.CookieAuthOptions(options);

        //    return options;
        //}

        //private static HttpConfiguration ConfigureWebApi(IContainer container)
        //{
        //    var configuration = container.Resolve<HttpConfiguration>();
        //    configuration.DependencyResolver = new WebApiInfrastructureDependencyResolver(container);
        //    configuration.MessageHandlers.Insert(0, new DependencyScopeInjector());

        //    CorsConfig.Configure(configuration);
        //    FilterConfig.Configure(configuration, container);
        //    FormatterConfig.Configure(configuration);
        //    RouteConfig.Configure(configuration, container);

        //    return configuration;
        //}
    }
}