using System.Collections.Generic;

namespace SSAH.Core.Domain.CourseCreation
{
    public class SolverParam
    {
        public SolverParam(int courseCount, ICollection<SolverParticipant> participants)
        {
            CourseCount = courseCount;
            Participants = participants;
        }

        public int CourseCount { get; }

        public IEnumerable<SolverParticipant> Participants { get; }
    }
}