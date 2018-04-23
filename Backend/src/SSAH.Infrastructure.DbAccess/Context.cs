using Microsoft.EntityFrameworkCore;

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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            _contextOptionsProvider.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _modelCreator.OnModelCreating(modelBuilder);
        }
    }
}