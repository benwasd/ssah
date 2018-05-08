using System.Collections.Generic;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain
{
    public interface IRegistrationRepository : IRepository<Registration>
    {
        IEnumerable<RegistrationWithPartipiant> GetRegisteredPartipiants();
    }
}