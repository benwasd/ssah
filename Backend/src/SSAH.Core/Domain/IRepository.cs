using System.Collections.Generic;

namespace SSAH.Core.Domain
{
    public interface IRepository<T>
    {
        IEnumerable<T> Get();

        T Create();

        void Add(T add);
    }
}