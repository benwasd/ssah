using Microsoft.EntityFrameworkCore;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public class ContextOptionsProvider : IContextOptionsProvider
    {
        public void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(@"Server=.\SQLEXPRESS; Database=SSAH; Integrated Security=True;");
            builder.UseLazyLoadingProxies();
        }
    }
}