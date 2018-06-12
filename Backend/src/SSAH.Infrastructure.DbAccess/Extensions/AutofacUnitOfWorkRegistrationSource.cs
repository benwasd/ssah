using System;
using System.Collections.Generic;

using Autofac;
using Autofac.Core;
using Autofac.Core.Activators.Delegate;
using Autofac.Core.Lifetime;
using Autofac.Core.Registration;

using SSAH.Core;

namespace SSAH.Infrastructure.DbAccess.Extensions
{
    public class AutofacUnitOfWorkRegistrationSource : IRegistrationSource
    {
        private readonly IUnitOfWork _unitOfWork;

        public AutofacUnitOfWorkRegistrationSource(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<IComponentRegistration> RegistrationsFor(Service service, Func<Service, IEnumerable<IComponentRegistration>> registrationAccessor)
        {
            var serviceWithType = service as IServiceWithType;
            if (serviceWithType != null)
            {
                if (IsUnitOfWorkType(serviceWithType.ServiceType))
                {
                    yield return CreateRegistration(service, serviceWithType.ServiceType, (c, p) => _unitOfWork);
                }
            }
        }

        public bool IsAdapterForIndividualComponents { get; } = false;

        private static bool IsUnitOfWorkType(Type serviceType)
        {
            return typeof(IUnitOfWork).IsAssignableFrom(serviceType);
        }

        private static ComponentRegistration CreateRegistration(Service service, Type serviceType, Func<IComponentContext, IEnumerable<Parameter>, object> factory)
        {
            return new ComponentRegistration(
                Guid.NewGuid(),
                new DelegateActivator(serviceType, factory),
                new CurrentScopeLifetime(),
                InstanceSharing.None,
                InstanceOwnership.OwnedByLifetimeScope,
                new[] { service },
                new Dictionary<string, object>()
            );
        }
    }
}