using System;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Services
{
    public interface IDemandService
    {
        void GetGroupCourseDemand(Discipline discipline, DateTime from, DateTime to);
    }
}