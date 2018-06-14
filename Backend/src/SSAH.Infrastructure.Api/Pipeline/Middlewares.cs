using System;

using Autofac;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;

using SSAH.Core;
using SSAH.Infrastructure.Api.Extensions;

namespace SSAH.Infrastructure.Api.Pipeline
{
    public static class Middlewares
    {
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
                    var logger = context.GetRequestUnitOfWork()?.Dependent?.Resolve<ILogger>();
                    logger?.LogCritical(ex, "Global Exception Handler caught an exception.");

                    throw;
                }
            });

            return app;
        }
    }
}