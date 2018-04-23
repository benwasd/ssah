using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.DbAccess.Domain
{
    public class Repository<T> : IRepository<T>
        where T : class
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

        public T Create()
        {
            return Activator.CreateInstance<T>();
            //return _set.CreateProxy();
        }

        public void Add(T add)
        {
            _set.Add(add);
        }
    }
}