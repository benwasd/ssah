using System;
using System.Collections.Generic;
using System.Linq;

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

        public double CourseSizeMultiplier 
        {
            get
            {
                var isBoostableCourseSize = Courses.All(c => 5 <= c.Participants.Count() && c.Participants.Count() <= 7);
                if (isBoostableCourseSize)
                {
                    return 1;
                }

                var isAcceptableCourseSize = Courses.All(c => 3 <= c.Participants.Count() && c.Participants.Count() <= 8);
                if (isAcceptableCourseSize)
                {
                    var avarageDeltaFromOptimalSize = Courses.Select(c => Math.Abs(6 - c.Participants.Count())).Average();

                    // Format: { sizeOfCourse1, sizeOfCourse2, ... } -> multiplier
                    // { 6, 6 } -> 1
                    // { 4, 5 } -> 1.3
                    // { 9 } -> 1.6
                    // { 7, 2 } -> 1.5
                    return avarageDeltaFromOptimalSize / 5.0 + 1;
                }

                // Format: courseCount -> multiplier
                // 1 -> 1.5
                // 2 -> 2
                // 6 -> 4
                // 7 -> 4.5
                return Courses.Count() / 2.0 + 1;
            }
        }

        public override string ToString()
        {
            return $"{Score} - size multiplier: {CourseSizeMultiplier} - course count: {Courses.Count()}";
        }
    }
}