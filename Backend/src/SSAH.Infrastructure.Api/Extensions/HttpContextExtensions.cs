using Autofac;

using Microsoft.AspNetCore.Http;

using SSAH.Core;

namespace SSAH.Infrastructure.Api.Extensions
{
    public static class HttpContextExtensions
    {
        public static IUnitOfWork<ILifetimeScope> GetRequestUnitOfWork(this HttpContext context)
        {
            return (IUnitOfWork<ILifetimeScope>)context.Items[Constants.UnitOfWork.REQUEST_CONTEXT_UNIT_OF_WORK_KEY];
        }

        public static HttpContext SetRequestUnitOfWork(this HttpContext context, IUnitOfWork<ILifetimeScope> requestUnitOfWork)
        {
            context.Items[Constants.UnitOfWork.REQUEST_CONTEXT_UNIT_OF_WORK_KEY] = requestUnitOfWork;

            return context;
        }
    }
}