using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Services
{
    public interface IDemandService
    {
        IEnumerable<PotentialCourse> GetGroupCourseDemand(Discipline discipline, DateTime from, DateTime to);
    }
}