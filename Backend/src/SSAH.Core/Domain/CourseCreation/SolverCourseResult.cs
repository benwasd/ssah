using System.Collections.Generic;

namespace SSAH.Core.Domain.CourseCreation
{
    public class SolverCourseResult
    {
        public SolverCourseResult(ICollection<SolverParticipant> participants)
        {
            Participants = participants;
        }

        public IEnumerable<SolverParticipant> Participants { get; }
    }
}