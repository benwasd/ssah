using System;

using Autofac;

namespace SSAH.Core
{
    /// <summary>
    /// Defines an unit of work factory. Creates <see cref="IUnitOfWork{T}"/> instances nested in the current <see cref="ILifetimeScope"/>.
    /// </summary>
    public interface IUnitOfWorkFactory<out T>
    {
        IUnitOfWork<T> Begin();

        IUnitOfWork<T> Begin(Action<ContainerBuilder> lifetimeScopeConfigurationAction);
    }

    /// <summary>
    /// Defines an unit of work factory. Creates <see cref="IUnitOfWork{T1, T2}"/> instances nested in the current <see cref="ILifetimeScope"/>.
    /// </summary>
    public interface IUnitOfWorkFactory<out T1, out T2>
    {
        IUnitOfWork<T1, T2> Begin();

        IUnitOfWork<T1, T2> Begin(Action<ContainerBuilder> lifetimeScopeConfigurationAction);
    }

    /// <summary>
    /// Defines an unit of work factory. Creates <see cref="IUnitOfWork{T1, T2, T3}"/> instances nested in the current <see cref="ILifetimeScope"/>.
    /// </summary>
    public interface IUnitOfWorkFactory<out T1, out T2, out T3>
    {
        IUnitOfWork<T1, T2, T3> Begin();

        IUnitOfWork<T1, T2, T3> Begin(Action<ContainerBuilder> lifetimeScopeConfigurationAction);
    }
}