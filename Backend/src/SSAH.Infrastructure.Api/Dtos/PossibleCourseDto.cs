using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class PossibleCourseDto
    {
        public Guid RegistrationParticipantId { get; set; }
        
        public int Identifier { get; set; }

        public DateTime StartDate { get; set; }

        public ICollection<Period> CoursePeriods { get; set; }
    }
}