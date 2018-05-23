using System.Collections.Generic;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class CloseCourseDto : EntityDto
    {
        public ICollection<CourseParticipantFeedbackDto> Participants { get; set; }
    }
}