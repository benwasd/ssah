using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using SSAH.Core.Domain.Entities;

namespace SSAH.Core.Domain
{
    public interface IRepository<T>
        where T : EntityBase
    {
        IEnumerable<T> Get();

        T GetById(Guid id);

        Task<T> GetByIdAsync(Guid id);

        T GetByIdOrDefault(Guid id);

        Task<T> GetByIdOrDefaultAsync(Guid id);

        T Create();

        T CreateAndAdd();

        void Add(T add);

        void Remove(T remove);
    }
}