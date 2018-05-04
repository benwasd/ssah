using System;
using System.Linq;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.DbAccess.Domain
{
    public class SeasonRepository : Repository<Season>, ISeasonRepository
    {
        public SeasonRepository(DbSet<Season> set)
            : base(set)
        {
        }

        public Season GetCurrentOrDefault(DateTime today)
        {
            return GetQuery().FirstOrDefault(s => s.Start <= today && today <= s.End);
        }

        public Season GetUpcommingOrDefault(DateTime today)
        {
            return GetQuery().OrderBy(s => s.Start).FirstOrDefault(s => s.Start >= today);
        }

        public Season GetCurrentOrUpcommingOrThrow(DateTime today)
        {
            var currentOrUpcomming = GetCurrentOrDefault(today) ?? GetCurrentOrUpcommingOrThrow(today);

            if (currentOrUpcomming == null)
            {
                throw new InvalidOperationException("The database contains no active or upcomming season.");
            }

            return currentOrUpcomming;
        }
    }
}