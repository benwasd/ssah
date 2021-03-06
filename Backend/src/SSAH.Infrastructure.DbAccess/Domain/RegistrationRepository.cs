﻿using System;
using System.Collections.Generic;
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
        private readonly DbSet<RegistrationParticipant> _registrationParticipantSet;

        public RegistrationRepository(DbSet<Registration> set, DbSet<RegistrationParticipant> registrationParticipantSet)
            : base(set)
        {
            _registrationParticipantSet = registrationParticipantSet;
        }

        public IEnumerable<RegistrationWithParticipant> GetRegisteredParticipantOverlappingPeriod(CourseType courseType, Discipline discipline, int niveauId, DateTime from, DateTime to, bool onlyUncommittedRegistrations = false)
        {
            var result = GetRegisteredParticipants()
                .Where(rp => rp.RegistrationParticipant.CourseType == courseType && rp.RegistrationParticipant.Discipline == discipline && rp.RegistrationParticipant.NiveauId == niveauId)
                .Where(rp => from <= rp.Registration.AvailableTo && rp.Registration.AvailableFrom <= to);

            if (onlyUncommittedRegistrations)
            {
                // Note: Keep condition in sync with Registration.Status
                result = result.Where(r => r.Registration.RegistrationParticipants.All(rp => rp.ResultingParticipantId == null));
            }

            return result;
        }

        public async Task<IEnumerable<Registration>> GetByApplicantAsync(Guid applicantId)
        {
            return await GetQuery().Where(r => r.ApplicantId == applicantId).ToArrayAsync();
        }

        private IEnumerable<RegistrationWithParticipant> GetRegisteredParticipants()
        {
            return Queryable.Join(
                _registrationParticipantSet,
                GetSet(),
                left => left.RegistrationId,
                right => right.Id,
                (left, right) => new RegistrationWithParticipant { Registration = right, RegistrationParticipant = left }
            );
        }
    }
}