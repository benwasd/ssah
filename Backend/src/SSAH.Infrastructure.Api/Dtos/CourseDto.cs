using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class CourseDto : EntityDto
    {
        public Discipline Discipline { get; set; }

        public int NiveauId { get; set; }

        public DateTime ActualCourseStart { get; set; }

        public ICollection<Period> CoursePeriods { get; set; }

        public ICollection<CourseParticipantDto> Participants { get; set; }
    }
}