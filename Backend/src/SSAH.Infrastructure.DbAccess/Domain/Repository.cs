using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;

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
    }
}