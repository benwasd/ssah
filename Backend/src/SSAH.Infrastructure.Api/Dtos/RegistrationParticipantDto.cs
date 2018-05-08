using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class RegistrationParticipantDto
    {
        public string Name { get; set; }

        public CourseType CourseType { get; set; }

        public int NiveauId { get; set; }
    }
}