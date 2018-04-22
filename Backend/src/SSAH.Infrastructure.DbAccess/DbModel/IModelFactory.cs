using Microsoft.EntityFrameworkCore.Metadata;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public interface IModelFactory
    {
        IModel Create();
    }
}