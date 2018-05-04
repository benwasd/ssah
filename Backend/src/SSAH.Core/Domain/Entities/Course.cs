using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.Entities
{
    public class Course : EntityBase
    {
        public Discipline Discipline { get; set; }

        public Guid InstructorId { get; set; }

        public virtual Instructor Instructor { get; set; }

        public virtual ICollection<CourseParticipant> Participants { get; set; }

        public DateTime StartDate { get; set; }

        [StringLength(Constants.StringLengths.TEXT)]
        public string PeriodOptionsValue { get; set; }

        public ICollection<GroupCoursePeriodOptions> GetPeriodsOptions(ISerializationService serializerService)
        {
            return serializerService.Deserialize<ICollection<GroupCoursePeriodOptions>>(PeriodOptionsValue);
        }

        public void SetPeriodsOptions(ISerializationService serializerService, ICollection<GroupCoursePeriodOptions> options)
        {
            PeriodOptionsValue = serializerService.Serialize(options);
        }

        public IEnumerable<Period> GetAllCourseDates(ISerializationService serializerService)
        {
            var periodsOptions = GetPeriodsOptions(serializerService);

            foreach (var periodOptionsByWeek in periodsOptions.OrderBy(p => p.Week).GroupBy(p => p.Week))
            {
                var date = StartDate.Date.AddDays(periodOptionsByWeek.Key * 7);

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