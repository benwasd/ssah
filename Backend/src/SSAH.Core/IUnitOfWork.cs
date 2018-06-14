using System;
using System.Threading.Tasks;

namespace SSAH.Core
{
    /// <summary>
    /// Defines an unit of work. Unites an autofac lifetime scope and an entity framework context to one encapsulated unit to work in.
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        void Commit();

        Task CommitAsync();
    }

    /// <summary>
    /// Defines an unit of work. Unites an autofac lifetime scope and an entity framework context to one encapsulated unit to work in.
    /// </summary>
    public interface IUnitOfWork<out TDependent> : IUnitOfWork
    {
        TDependent Dependent { get; }
    }

    /// <summary>
    /// Defines an unit of work. Unites an autofac lifetime scope and an entity framework context to one encapsulated unit to work in.
    /// </summary>
    public interface IUnitOfWork<out TDependent1, out TDependent2> : IUnitOfWork<TDependent1>
    {
        TDependent2 Dependent2 { get; }
    }

    /// <summary>
    /// Defines an unit of work. Unites an autofac lifetime scope and an entity framework context to one encapsulated unit to work in.
    /// </summary>
    public interface IUnitOfWork<out TDependent1, out TDependent2, out TDependent3> : IUnitOfWork<TDependent1, TDependent2>
    {
        TDependent3 Dependent3 { get; }
    }
}