using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class OfferDto
    {
        public CourseType Type { get; set; }

        public Discipline Discipline { get; set; }
    }
}