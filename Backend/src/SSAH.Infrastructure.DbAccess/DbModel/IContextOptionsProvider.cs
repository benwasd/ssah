using Microsoft.EntityFrameworkCore;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public interface IContextOptionsProvider
    {
        void OnConfiguring(DbContextOptionsBuilder builder);
    }
}