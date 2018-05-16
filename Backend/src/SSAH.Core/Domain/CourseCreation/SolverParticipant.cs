using System;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.CourseCreation
{
    public class SolverParticipant
    {
        public SolverParticipant(Guid id, int year, Language language, int coursesCountInSameNiveau)
        {
            Id = id;
            Year = year;
            Language = language;
            CoursesCountInSameNiveau = coursesCountInSameNiveau;
        }

        public Guid Id { get; }

        public int Year { get; }

        public Language Language { get; }

        public int CoursesCountInSameNiveau { get; }
    }
}