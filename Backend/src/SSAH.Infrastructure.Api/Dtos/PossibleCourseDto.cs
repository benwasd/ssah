using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class PossibleCourseDto
    {
        public Guid RegistrationPartipiantId { get; set; }
        
        public ICollection<Period> CoursePeriods { get; set; }
    }
}