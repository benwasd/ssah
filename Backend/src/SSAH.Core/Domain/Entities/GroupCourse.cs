using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.Entities
{
    public class GroupCourse : Course
    {
        protected GroupCourse()
        {
        }

        public GroupCourse(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate)
            : base(discipline, status, niveauId, startDate)
        {
        }

        public int OptionsIdentifier { get; set; }

        [StringLength(Constants.StringLengths.TEXT)]
        [Required]
        public string PeriodsOptionsValue { get; set; }

        public GroupCoursePeriodOptionsCollection GetPeriodsOptions(ISerializationService serializerService)
        {
            return serializerService.Deserialize<GroupCoursePeriodOptionsCollection>(PeriodsOptionsValue);
        }

        public GroupCourse SetPeriodsOptions(ISerializationService serializerService, GroupCourseOptions options)
        {
            OptionsIdentifier = options.Identifier;
            PeriodsOptionsValue = serializerService.Serialize(options.Periods);
            return this;
        }

        public IEnumerable<Period> GetAllCourseDates(ISerializationService serializerService)
        {
            return GetPeriodsOptions(serializerService).GetCourseDatesOfOneExecution(StartDate);
        }
    }
}