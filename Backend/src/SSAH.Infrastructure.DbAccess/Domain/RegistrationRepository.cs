using System.Collections.Generic;
using System.Linq;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Expressions;

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

        public IEnumerable<RegistrationWithPartipiant> GetRegisteredPartipiants()
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