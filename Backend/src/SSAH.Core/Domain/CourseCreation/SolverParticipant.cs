using System;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.CourseCreation
{
    public class SolverParticipant
    {
        public SolverParticipant(Participant participant, int courseNiveauId)
        {
            Id = participant.Id;
            AgeGroup = participant.AgeGroup;
            Language = participant.Language;
            CoursesDaysInSameNiveau = participant.CoursesDaysInSameNiveau(courseNiveauId);
        }

        public SolverParticipant(Guid id, int ageGroup, Language language, int coursesDaysInSameNiveau)
        {
            Id = id;
            AgeGroup = ageGroup;
            Language = language;
            CoursesDaysInSameNiveau = coursesDaysInSameNiveau;
        }

        public Guid Id { get; }

        public int AgeGroup { get; }

        public Language Language { get; }

        public int CoursesDaysInSameNiveau { get; }
    }
}