using Microsoft.EntityFrameworkCore;

namespace SSAH.Infrastructure.DbAccess
{
    public class Context : DbContext
    {
        public Context(DbContextOptions options) 
            : base(options)
        {
        }
    }
}