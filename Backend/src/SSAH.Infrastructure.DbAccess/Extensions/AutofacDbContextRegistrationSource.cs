using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

using Autofac;
using Autofac.Core;
using Autofac.Core.Activators.Delegate;
using Autofac.Core.Lifetime;
using Autofac.Core.Registration;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace SSAH.Infrastructure.DbAccess.Extensions
{
    public class AutofacDbContextRegistrationSource : IRegistrationSource
    {
        private static readonly MethodInfo s_dbSetMethod = typeof(DbContext).GetMethod("Set", new Type[0]);
        private readonly DbContext _dbContext;

        public AutofacDbContextRegistrationSource(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<IComponentRegistration> RegistrationsFor(Service service, Func<Service, IEnumerable<IComponentRegistration>> registrationAccessor)
        {
            var serviceWithType = service as IServiceWithType;
            if (serviceWithType == null)
            {
                yield break;
            }

            if (IsDbSet(serviceWithType.ServiceType))
            {
                var entityType = serviceWithType.ServiceType.GetGenericArguments()[0];
                var entityDbSetResolver = DbSetResolver(entityType);

                yield return CreateRegistration(service, serviceWithType.ServiceType, (c, p) => entityDbSetResolver(_dbContext));
            }
            else if (Is<Database>(serviceWithType.ServiceType))
            {
                yield return CreateRegistration(service, serviceWithType.ServiceType, (c, p) => _dbContext.Database);
            }
        }

        public bool IsAdapterForIndividualComponents { get; } = false;

        private static bool IsDbSet(Type serviceType)
        {
            return serviceType.IsGenericType
                   && serviceType.GetGenericTypeDefinition() == typeof(DbSet<>);
        }

        private static bool Is<T>(Type serviceType)
        {
            return typeof(T).IsAssignableFrom(serviceType);
        }

        private static Func<DbContext, object> DbSetResolver(Type entityType)
        {
            var param = Expression.Parameter(typeof(DbContext));
            var dbSetCall = Expression.Call(param, s_dbSetMethod.MakeGenericMethod(entityType));
            var lambda = Expression.Lambda<Func<DbContext, object>>(dbSetCall, param);

            return lambda.Compile();
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