using System;
using System.Collections.Generic;
using System.Linq;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Extensions
{
    public static class DateTimeExtensions
    {
        public static int WeekDiff(DateTime a, DateTime b)
        {
            var x = Math.Abs((a.Date - b.Date).TotalDays) + 1;
            var y = Math.Floor(x / 7);

            return (int)y;
        }

        public static DateTime GetMondayOfWeek(this DateTime x)
        {
            var y = ((int)x.DayOfWeek + 6) % 7;

            return x.AddDays(y * -1);
        }

        public static bool Overlaps(this IEnumerable<Period> a, IEnumerable<Period> b)
        {
            var seqa = a.ToArray();
            var seqb = b.ToArray();

            foreach (var elea in seqa)
            {
                if (seqb.Any(eleb => elea.Start <= eleb.End && eleb.Start <= elea.End))
                {
                    return true;
                }
            }

            return false;
        }
    }
}