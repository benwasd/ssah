using System.Collections.Generic;

namespace SSAH.Core.Domain.CourseCreation
{
    public class SolverResult
    {
        public SolverResult(double score, ICollection<SolverCourseResult> courses)
        {
            Score = score;
            Courses = courses;
        }

        public double Score { get; }

        public IEnumerable<SolverCourseResult> Courses { get; }
    }
}