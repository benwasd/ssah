using System;
using System.Collections.Generic;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class CommitRegistrationDto
    {
        public Guid RegistrationId { get; set; }

        // TODO: Payment Data, Hash...
        public string Payment { get; set; }

        public ICollection<CommitRegistrationParticipantDto> Participants { get; set; }
    }
}