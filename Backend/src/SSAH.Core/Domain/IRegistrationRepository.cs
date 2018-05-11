﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain
{
    public interface IRegistrationRepository : IRepository<Registration>
    {
        IEnumerable<RegistrationWithPartipiant> GetRegisteredPartipiantOverlappingPeriod(Discipline discipline, DateTime from, DateTime to);

        Task<IEnumerable<Registration>> GetByApplicant(Guid applicantId);
    }
}