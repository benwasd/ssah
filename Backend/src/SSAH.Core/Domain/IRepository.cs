using System.Collections.Generic;

namespace SSAH.Core.Domain
{
    public interface IRepository<out T>
    {
        IEnumerable<T> Get();
    }
}