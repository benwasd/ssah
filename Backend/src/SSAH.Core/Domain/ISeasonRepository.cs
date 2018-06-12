using System;

using SSAH.Core.Domain.Entities;

namespace SSAH.Core.Domain
{
    public interface ISeasonRepository : IRepository<Season>
    {
        Season GetCurrentOrDefault(DateTime today);

        Season GetUpcommingOrDefault(DateTime today);

        Season GetCurrentOrUpcommingOrThrow(DateTime today);
    }
}