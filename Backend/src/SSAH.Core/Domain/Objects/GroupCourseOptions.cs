using System;
using System.Linq;

namespace SSAH.Core.Domain.Objects
{
    public class GroupCourseOptions
    {
        public int Identifier { get; set; }

        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public int WeekInterval { get; set; } = 1;

        public Discipline Discipline { get; set; }

        public int[] NiveauIds { get; set; }

        public bool Match(Discipline discipline, int niveauId)
        {
            return Discipline == discipline && NiveauIds != null && NiveauIds.Contains(niveauId);
        }

        public GroupCoursePeriodOptionsCollection Periods { get; set; }
    }
}