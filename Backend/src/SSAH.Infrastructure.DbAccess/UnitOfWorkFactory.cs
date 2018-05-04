using System;

using Autofac;
using Microsoft.EntityFrameworkCore;

using SSAH.Core;
using SSAH.Infrastructure.DbAccess.DbModel;
using SSAH.Infrastructure.DbAccess.Extensions;

namespace SSAH.Infrastructure.DbAccess
{
    /// <summary>
    /// Implements an unit of work factory base class. Creates any <see cref="TUnitOfWork"/> instances nested in the current <see cref="ILifetimeScope"/>.
    /// </summary>
    public abstract class UnitOfWorkFactoryBase<TUnitOfWork>
        where TUnitOfWork : IUnitOfWork
    {
        private readonly ILifetimeScope _lifetimeScope;

        protected UnitOfWorkFactoryBase(ILifetimeScope lifetimeScope)
        {
            _lifetimeScope = lifetimeScope;
        }

        public TUnitOfWork Begin()
        {
            return Begin(_ => { });
        }

        public TUnitOfWork Begin(Action<ContainerBuilder> lifetimeScopeConfigurationAction)
        {
            var childLifetimeScope = BeginChildLifetimeScope(_lifetimeScope, lifetimeScopeConfigurationAction);
            var context = CreateContextInLifetimeScope(childLifetimeScope);

            RegisterContextSpecificComponents(context, childLifetimeScope);

            var unitOfWork = CreateUnitOfWork(context, childLifetimeScope);

            RegisterUnitOfWorkComponent(unitOfWork, childLifetimeScope);

            return unitOfWork;
        }

        private static ILifetimeScope BeginChildLifetimeScope(ILifetimeScope parentLifetimeScope, Action<ContainerBuilder> lifetimeScopeConfigurationAction)
        {
            var isTopLevelUnitOfWork = parentLifetimeScope.ResolveOptional<IUnitOfWork>() == null;

            return isTopLevelUnitOfWork
                ? parentLifetimeScope.BeginLifetimeScope(Constants.UnitOfWork.TOP_LEVEL_LIFETIME_SCOPE_TAG, lifetimeScopeConfigurationAction)
                : parentLifetimeScope.BeginLifetimeScope(lifetimeScopeConfigurationAction);
        }

        private static DbContext CreateContextInLifetimeScope(ILifetimeScope childLifetimeScope)
        {
            var context = new Context(
                childLifetimeScope.Resolve<IContextOptionsProvider>(),
                childLifetimeScope.Resolve<IModelCreator>()
            );

            if (initialized == false)
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                initialized = true;
            }
            

            return context;
        }

        private static bool initialized = false;

        private static void RegisterContextSpecificComponents(DbContext context, ILifetimeScope childLifetimeScope)
        {
            var dbContextRegistrationSource = new AutofacDbContextRegistrationSource(context);
            childLifetimeScope.ComponentRegistry.AddRegistrationSource(dbContextRegistrationSource);
        }

        protected abstract TUnitOfWork CreateUnitOfWork(DbContext context, ILifetimeScope lifetimeScope);

        private static void RegisterUnitOfWorkComponent(IUnitOfWork context, ILifetimeScope childLifetimeScope)
        {
            var unitOfWorkRegistrationSource = new AutofacUnitOfWorkRegistrationSource(context);
            childLifetimeScope.ComponentRegistry.AddRegistrationSource(unitOfWorkRegistrationSource);
        }
    }

    /// <summary>
    /// Implements an unit of work factory. Creates <see cref="IUnitOfWork{T}"/> instances nested in the current <see cref="ILifetimeScope"/>.
    /// </summary>
    public class UnitOfWorkFactory<T> : UnitOfWorkFactoryBase<IUnitOfWork<T>>, IUnitOfWorkFactory<T>
    {
        public UnitOfWorkFactory(ILifetimeScope lifetimeScope)
            : base(lifetimeScope)
        {
        }

        protected override IUnitOfWork<T> CreateUnitOfWork(DbContext context, ILifetimeScope lifetimeScope)
        {
            return new UnitOfWork<T>(context, lifetimeScope, lifetimeScope.Resolve<Lazy<T>>());
        }
    }

    /// <summary>
    /// Implements an unit of work factory. Creates <see cref="IUnitOfWork{T1, T2}"/> instances nested in the current <see cref="ILifetimeScope"/>.
    /// </summary>
    public class UnitOfWorkFactory<T1, T2> : UnitOfWorkFactoryBase<IUnitOfWork<T1, T2>>, IUnitOfWorkFactory<T1, T2>
    {
        public UnitOfWorkFactory(ILifetimeScope lifetimeScope)
            : base(lifetimeScope)
        {
        }

        protected override IUnitOfWork<T1, T2> CreateUnitOfWork(DbContext context, ILifetimeScope lifetimeScope)
        {
            return new UnitOfWork<T1, T2>(context, lifetimeScope, lifetimeScope.Resolve<Lazy<T1>>(), lifetimeScope.Resolve<Lazy<T2>>());
        }
    }

    /// <summary>
    /// Implements an unit of work factory. Creates <see cref="IUnitOfWork{T1, T2, T3}"/> instances nested in the current <see cref="ILifetimeScope"/>.
    /// </summary>
    public class UnitOfWorkFactory<T1, T2, T3> : UnitOfWorkFactoryBase<IUnitOfWork<T1, T2, T3>>, IUnitOfWorkFactory<T1, T2, T3>
    {
        public UnitOfWorkFactory(ILifetimeScope lifetimeScope)
            : base(lifetimeScope)
        {
        }

        protected override IUnitOfWork<T1, T2, T3> CreateUnitOfWork(DbContext context, ILifetimeScope lifetimeScope)
        {
            return new UnitOfWork<T1, T2, T3>(context, lifetimeScope, lifetimeScope.Resolve<Lazy<T1>>(), lifetimeScope.Resolve<Lazy<T2>>(), lifetimeScope.Resolve<Lazy<T3>>());
        }
    }
}