using SSAH.Core.Domain.Entities;

namespace SSAH.Core.Domain.Demanding
{
    public class PotentialCourse
    {
        public Course Course { get; set; }

        public int Demand { get; set; }
    }
}