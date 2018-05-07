using System.Collections.Generic;

namespace SSAH.Core.Domain.Objects
{
    public class NiveauDecisionOptions
    {
        public ICollection<Niveau> Niveaus { get; set; }

        public NiveauQuestion DecisionTree { get; set; }
    }

    public class NiveauQuestion
    {
        public string Question { get; set; }

        public ICollection<NiveauResponse> Responses { get; set; }
    }

    public class NiveauResponse
    {
        public string Response { get; set; }

        public NiveauQuestion FollowingQuestion { get; set; }

        public int? Niveau { get; set; }
    }

    public class Niveau
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Discipline Discipline { get; set; }
    }
}