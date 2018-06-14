using System;

using Autofac;

using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace SSAH.Infrastructure.Api.Pipeline
{
    public class AutofacContainerHubActivator<T> : IHubActivator<T> 
        where T : Hub
    {
        private readonly IContainer _rootContainer;

        public AutofacContainerHubActivator(IServiceProvider serviceProvider)
        {
            _rootContainer = serviceProvider.GetService<IContainer>();
        }

        public T Create()
        {
            return _rootContainer.Resolve<T>();
        }

        public void Release(T hub)
        {
        }
    }
}