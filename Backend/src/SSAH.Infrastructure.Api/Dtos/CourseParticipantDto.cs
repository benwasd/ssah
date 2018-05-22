using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class CourseParticipantDto : EntityDto
    {
        public string Name { get; set; }

        public Language Language { get; set; }

        /// <summary>Jahrgang</summary>
        public int AgeGroup { get; set; }

        public string Residence { get; set; }

        public string PhoneNumber { get; set; }
    }
}