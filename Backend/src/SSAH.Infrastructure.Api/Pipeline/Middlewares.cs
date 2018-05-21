using System;
using System.Diagnostics;

using Autofac;

using Microsoft.AspNetCore.Builder;

using SSAH.Core;
using SSAH.Infrastructure.Api.Extensions;

namespace SSAH.Infrastructure.Api.Pipeline
{
    public static class Middlewares
    {
        public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                // TODO: log global exceptions

                try
                {
                    await next();
                }
                catch (OperationCanceledException)
                {
                }
                catch (Exception ex)
                {
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
    }
}