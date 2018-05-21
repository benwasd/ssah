using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.DbAccess.Domain
{
    public class RegistrationRepository : Repository<Registration>, IRegistrationRepository
    {
        private readonly DbSet<RegistrationPartipiant> _registrationPartipiantSet;

        public RegistrationRepository(DbSet<Registration> set, DbSet<RegistrationPartipiant> registrationPartipiantSet)
            : base(set)
        {
            _registrationPartipiantSet = registrationPartipiantSet;
        }

        public IEnumerable<RegistrationWithPartipiant> GetRegisteredPartipiantOverlappingPeriod(Discipline discipline, DateTime from, DateTime to)
        {
            return GetRegisteredPartipiants()
                .Where(rp => rp.RegistrationPartipiant.Discipline == discipline)
                .Where(rp => from <= rp.Registration.AvailableTo && rp.Registration.AvailableFrom <= to);
        }

        public async Task<IEnumerable<Registration>> GetByApplicantAsync(Guid applicantId)
        {
            return await GetQuery().Where(r => r.ApplicantId == applicantId).ToArrayAsync();
        }

        private IEnumerable<RegistrationWithPartipiant> GetRegisteredPartipiants()
        {
            return Queryable.Join(
                _registrationPartipiantSet,
                GetSet(),
                left => left.RegistrationId,
                right => right.Id,
                (left, right) => new RegistrationWithPartipiant { Registration = right, RegistrationPartipiant = left }
            );
        }
    }
}