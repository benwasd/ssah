using System;

namespace SSAH.Core.Domain.Objects
{
    public class GroupCourseOptions
    {
        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public Discipline Discipline { get; set; }

        public DayOfWeek StartDay { get; set; }

        public TimeSpan StartTime { get; set; }

        public DayOfWeek EndDay { get; set; }

        public TimeSpan EndTime { get; set; }
    }
}