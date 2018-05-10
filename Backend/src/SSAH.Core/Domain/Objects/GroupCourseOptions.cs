using System;

namespace SSAH.Core.Domain.Objects
{
    public class GroupCourseOptions
    {
        public int Identifier { get; set; }

        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public int WeekInterval { get; set; } = 1;

        public Discipline Discipline { get; set; }

        public GroupCoursePeriodOptionsCollection Periods { get; set; }
    }
}