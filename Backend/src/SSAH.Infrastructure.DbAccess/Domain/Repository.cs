using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.DbAccess.Domain
{
    public class Repository<T> : IRepository<T>
        where T : EntityBase
    {
        private readonly DbSet<T> _set;

        public Repository(DbSet<T> set)
        {
            _set = set;
        }

        public IEnumerable<T> Get()
        {
            return _set;
        }

        public T GetById(Guid id)
        {
            return GetQuery().First(e => e.Id == id);
        }

        public Task<T> GetByIdAsync(Guid id)
        {
            return GetQuery().FirstAsync(e => e.Id == id);
        }

        public T GetByIdOrDefault(Guid id)
        {
            return GetQuery().FirstOrDefault(e => e.Id == id);
        }

        public Task<T> GetByIdOrDefaultAsync(Guid id)
        {
            return GetQuery().FirstOrDefaultAsync(e => e.Id == id);
        }

        public T Create()
        {
            return _set.CreateProxy();
        }

        public T CreateAndAdd()
        {
            var created = _set.CreateProxy();
            _set.Add(created);

            return created;
        }

        public void Add(T add)
        {
            _set.Add(add);
        }

        public void Remove(T remove)
        {
            _set.Remove(remove);
        }

        protected DbSet<T> GetSet()
        {
            return _set;
        }

        protected virtual IQueryable<T> GetQuery()
        {
            return _set;
        }
    }
}