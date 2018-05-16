using System;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.CourseCreation
{
    public class SolverParticipant
    {
        public SolverParticipant(Participant participant)
        {
            Id = participant.Id;
            AgeGroup = participant.AgeGroup;
            Language = participant.Language;
            CoursesCountInSameNiveau = 3;
        }

        public SolverParticipant(Guid id, int ageGroup, Language language, int coursesCountInSameNiveau)
        {
            Id = id;
            AgeGroup = ageGroup;
            Language = language;
            CoursesCountInSameNiveau = coursesCountInSameNiveau;
        }

        public Guid Id { get; }

        public int AgeGroup { get; }

        public Language Language { get; }

        public int CoursesCountInSameNiveau { get; }
    }
}