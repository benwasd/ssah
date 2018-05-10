using SSAH.Core.Domain.Entities;

namespace SSAH.Core.Domain.Demanding
{
    public class PotentialGroupCourse
    {
        public GroupCourse GroupCourse { get; set; }

        public int Demand { get; set; }
    }
}