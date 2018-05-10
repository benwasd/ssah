using System;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.DbModel;

namespace SSAH.Infrastructure.DbAccess
{
    public class Context : DbContext
    {
        private readonly IContextOptionsProvider _contextOptionsProvider;
        private readonly IModelCreator _modelCreator;

        public Context(IContextOptionsProvider contextOptionsProvider, IModelCreator modelCreator)
        {
            _contextOptionsProvider = contextOptionsProvider;
            _modelCreator = modelCreator;
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            PrepareSaveChanges();

            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            PrepareSaveChanges();

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            _contextOptionsProvider.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _modelCreator.OnModelCreating(modelBuilder);
        }

        private void PrepareSaveChanges()
        {
            SetCreatorAndModifierProperties();
        }

        private void SetCreatorAndModifierProperties()
        {
            foreach (var entityEntry in ChangeTracker.Entries<EntityBase>())
            {
                if (entityEntry.State == EntityState.Added)
                {
                    entityEntry.Property(p => p.CreatedBy).CurrentValue = "System";
                    entityEntry.Property(p => p.CreatedOn).CurrentValue = DateTime.Now;
                }
                else if (entityEntry.State == EntityState.Modified)
                {
                    entityEntry.Property(p => p.ModifiedBy).CurrentValue = "System";
                    entityEntry.Property(p => p.ModifiedOn).CurrentValue = DateTime.Now;
                }
            }
        }
    }
}