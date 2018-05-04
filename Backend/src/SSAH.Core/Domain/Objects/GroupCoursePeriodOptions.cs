using System;

namespace SSAH.Core.Domain.Objects
{
    public class GroupCoursePeriodOptions
    {
        public DayOfWeek Day { get; set; }

        public int Week { get; set; } = 0;

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }
    }
}