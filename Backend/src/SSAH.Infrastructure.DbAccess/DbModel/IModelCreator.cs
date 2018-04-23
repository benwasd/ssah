using Microsoft.EntityFrameworkCore;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public interface IModelCreator
    {
        void OnModelCreating(ModelBuilder builder);
    }
}