using System;
using System.Threading.Tasks;
using Autofac;

using Microsoft.EntityFrameworkCore;

using SSAH.Core;

namespace SSAH.Infrastructure.DbAccess
{
    /// <summary>
    /// Implements an unit of work. Unites an autofac lifetime scope and an entity framework context to one encapsulated unit to work in.
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
        private readonly ILifetimeScope _lifetimeScope;
        private bool _isDisposed;

        public UnitOfWork(DbContext context, ILifetimeScope lifetimeScope)
        {
            _context = context;
            _lifetimeScope = lifetimeScope;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public Task CommitAsync()
        {
            return _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool isDisposing)
        {
            if (isDisposing && !_isDisposed)
            {
                _isDisposed = true;
                _context.Dispose();
                _lifetimeScope.Dispose();
            }
        }
    }

    /// <summary>
    /// Implements an unit of work. Unites an autofac lifetime scope and an entity framework context to one encapsulated unit to work in.
    /// </summary>
    public class UnitOfWork<TDependent> : UnitOfWork, IUnitOfWork<TDependent>
    {
        private readonly Lazy<TDependent> _dependent;

        public UnitOfWork(DbContext context, ILifetimeScope lifetimeScope, Lazy<TDependent> dependent)
            : base(context, lifetimeScope)
        {
            _dependent = dependent;
        }

        public TDependent Dependent
        {
            get { return _dependent.Value; }
        }
    }

    /// <summary>
    /// Implements an unit of work. Unites an autofac lifetime scope and an entity framework context to one encapsulated unit to work in.
    /// </summary>
    public class UnitOfWork<TDependent1, TDependent2> : UnitOfWork<TDependent1>, IUnitOfWork<TDependent1, TDependent2>
    {
        private readonly Lazy<TDependent2> _dependent2;

        public UnitOfWork(DbContext context, ILifetimeScope lifetimeScope, Lazy<TDependent1> dependent1, Lazy<TDependent2> dependent2)
            : base(context, lifetimeScope, dependent1)
        {
            _dependent2 = dependent2;
        }

        public TDependent2 Dependent2
        {
            get { return _dependent2.Value; }
        }
    }

    /// <summary>
    /// Implements an unit of work. Unites an autofac lifetime scope and an entity framework context to one encapsulated unit to work in.
    /// </summary>
    public class UnitOfWork<TDependent1, TDependent2, TDependent3> : UnitOfWork<TDependent1, TDependent2>, IUnitOfWork<TDependent1, TDependent2, TDependent3>
    {
        private readonly Lazy<TDependent3> _dependent3;

        public UnitOfWork(DbContext context, ILifetimeScope lifetimeScope, Lazy<TDependent1> dependent1, Lazy<TDependent2> dependent2, Lazy<TDependent3> dependent3)
            : base(context, lifetimeScope, dependent1, dependent2)
        {
            _dependent3 = dependent3;
        }

        public TDependent3 Dependent3
        {
            get { return _dependent3.Value; }
        }
    }
}