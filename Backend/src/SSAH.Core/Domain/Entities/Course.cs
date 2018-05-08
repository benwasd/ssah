using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.Entities
{
    public class Course : EntityBase
    {
        protected Course()
        {
        }

        public Course(Discipline discipline, CourseStatus status, CourseType type, int niveauId, DateTime startDate)
        {
            Discipline = discipline;
            Status = status;
            Type = type;
            NiveauId = niveauId;
            StartDate = startDate;
        }

        public Discipline Discipline { get; set; }

        public Guid? InstructorId { get; set; }

        public virtual Instructor Instructor { get; set; }

        public CourseStatus Status { get; set; }

        public CourseType Type { get; set; }

        public int NiveauId { get; set; }

        public virtual ICollection<CourseParticipant> Participants { get; set; }

        public DateTime StartDate { get; set; }

        [StringLength(Constants.StringLengths.TEXT)]
        [Required]
        public string PeriodOptionsValue { get; set; }

        public GroupCoursePeriodOptionsCollection GetPeriodsOptions(ISerializationService serializerService)
        {
            return serializerService.Deserialize<GroupCoursePeriodOptionsCollection>(PeriodOptionsValue);
        }

        public Course SetPeriodsOptions(ISerializationService serializerService, GroupCoursePeriodOptionsCollection options)
        {
            PeriodOptionsValue = serializerService.Serialize(options);
            return this;
        }

        public IEnumerable<Period> GetAllCourseDates(ISerializationService serializerService)
        {
            return GetPeriodsOptions(serializerService).GetCourseDatesOfOneExecution(StartDate);
        }
    }
}