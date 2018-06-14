using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using SSAH.Core;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public class ContextOptionsProvider : IContextOptionsProvider
    {
        private readonly IOptions<EnvironmentOptions> _environmentOptions;

        public ContextOptionsProvider(IOptions<EnvironmentOptions> environmentOptions)
        {
            _environmentOptions = environmentOptions;
        }

        public void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(_environmentOptions.Value.ConnectionString);
            builder.UseLazyLoadingProxies();
        }
    }
}