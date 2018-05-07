using System;
using System.Collections.Generic;

namespace SSAH.Core.Domain.Objects
{
    public class GroupCourseOptions
    {
        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public int WeekInterval { get; set; } = 1;

        public Discipline Discipline { get; set; }
        
        public ICollection<GroupCoursePeriodOptions> Periods { get; set; }
    }
}