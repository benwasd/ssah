using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace SSAH.Core.Domain.Objects
{
    public class GroupCoursePeriodOptionsCollection : Collection<GroupCoursePeriodOptions>
    {
        public static GroupCoursePeriodOptionsCollection Create(IEnumerable<GroupCoursePeriodOptions> items)
        {
            var collection = new GroupCoursePeriodOptionsCollection();

            foreach (var item in items)
            {
                collection.Add(item);
            }

            return collection;
        }

        public IEnumerable<Period> GetCourseDatesOfOneExecution(DateTime startDate)
        {
            foreach (var periodOptionsByWeek in this.OrderBy(p => p.Week).GroupBy(p => p.Week))
            {
                var date = startDate.Date.AddDays(periodOptionsByWeek.Key * 7);

                foreach (var periodOptions in periodOptionsByWeek.OrderBy(p => p.Day).ThenBy(p => p.StartTime))
                {
                    while (date.DayOfWeek != periodOptions.Day)
                    {
                        date = date.AddDays(1);
                    }

                    yield return new Period(date + periodOptions.StartTime, periodOptions.EndTime - periodOptions.StartTime);
                }
            }
        }
    }
}