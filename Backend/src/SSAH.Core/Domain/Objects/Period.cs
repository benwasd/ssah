using System;

namespace SSAH.Core.Domain.Objects
{
    public class Period
    {
        public Period(DateTime start, TimeSpan duration)
        {
            Start = start;
            Duration = duration;
        }

        public DateTime Start { get; }

        public TimeSpan Duration { get; }

        public DateTime End => Start + Duration;
    }
}