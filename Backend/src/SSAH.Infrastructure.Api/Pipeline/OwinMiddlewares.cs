using System;

using Autofac;

using Microsoft.AspNetCore.Builder;

using SSAH.Core;
using SSAH.Infrastructure.Api.Extensions;

namespace SSAH.Infrastructure.Api.Pipeline
{
    public static class OwinMiddlewares
    {
        public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                try
                {
                    await next();
                }
                catch (OperationCanceledException)
                {
                }
                catch (Exception ex)
                {
                    // log.Error("Global exception handler middleware caught an exception.", ex);

                    throw;
                }
            });

            return app;
        }

        public static IApplicationBuilder UseScopeMiddleware(this IApplicationBuilder app, IUnitOfWorkFactory<ILifetimeScope> unitOfWorkFactory)
        {
            app.Use(async (context, next) =>
            {
                using (var unitOfWork = unitOfWorkFactory.Begin())
                {
                    context.SetRequestUnitOfWork(unitOfWork);

                    await next();
                }
            });

            return app;
        }

        //public static IApplicationBuilder UseRequestId(this IApplicationBuilder app)
        //{
        //    app.Use(async (context, next) =>
        //    {
        //        // OWIN 1.0.1 specifies that the requestId may be set by the host,
        //        // and may be set by a middleware if not already set: http://owin.org/html/spec/owin-1.0.1.html
        //        if (!context.Request..TryGetValue(Constants.Api.OWIN_REQUEST_ID_KEY, out var requestId))
        //        {
        //            context.Environment[Constants.Api.OWIN_REQUEST_ID_KEY] = requestId = Guid.NewGuid().ToString();
        //        }

        //        context.GetRequestUnitOfWork()
        //            .Dependent.Resolve<IContexualLoggerPropertyInitializer>()
        //            .SetRequestId(requestId.ToString());

        //        await next();
        //    });

        //    return app;
        //}

        //public static IApplicationBuilder UseMiloAuth(this IAppBuilder app, CookieAuthenticationOptions cookieAuthenticationOptions)
        //{
        //    return app.UseCookieAuthentication(cookieAuthenticationOptions).Use<AuthOwinMiddleware>().UseUserIdentifierAsLoggerProperty();
        //}
        
        //private static IAppBuilder UseUserIdentifierAsLoggerProperty(this IAppBuilder app)
        //{
        //    app.Use(async (context, next) =>
        //    {
        //        var unitOfWork = context.GetRequestUnitOfWork();
        //        var contexualLoggerPropertyInitializer = unitOfWork.Dependent.Resolve<IContexualLoggerPropertyInitializer>();

        //        var miloUser = unitOfWork.Dependent.Resolve<IMiloUser>();
        //        contexualLoggerPropertyInitializer.SetUserIdentifier(miloUser);

        //        await next();
        //    });

        //    return app;
        //}
    }
}