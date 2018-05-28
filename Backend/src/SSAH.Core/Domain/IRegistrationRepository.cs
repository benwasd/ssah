using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain
{
    public interface IRegistrationRepository : IRepository<Registration>
    {
        IEnumerable<RegistrationWithParticipant> GetRegisteredParticipantOverlappingPeriod(CourseType courseType, Discipline discipline, int niveauId, DateTime from, DateTime to, bool onlyUncommittedRegistrations = false);

        Task<IEnumerable<Registration>> GetByApplicantAsync(Guid applicantId);
    }
}