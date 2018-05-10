using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Demanding
{
    public interface IDemandService
    {
        IEnumerable<PotentialGroupCourse> GetGroupCourseDemand(Discipline discipline, DateTime from, DateTime to, RegistrationWithPartipiant includingRegistration = null);
    }
}