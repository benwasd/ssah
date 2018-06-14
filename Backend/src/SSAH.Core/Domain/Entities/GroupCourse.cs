using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

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

        protected override int EvaluateMaximalBoundedInstructorCount()
        {
            var participantCount = Participants.Count;
            var result = 0;

            if (participantCount >= 21) // 21- = floor(x/7)+1 instructors
            {
                result = (int)Math.Floor(participantCount / 7m) + 1;
            }
            else if (participantCount >= 12) // 12-20 = 3 instructors
            {
                result = 3;
            }
            else if (participantCount >= 6) // 6-11 = 2 instructors
            {
                result = 2;
            }
            else if (participantCount >= 1) // 1-5 = 1 instructor
            {
                result = 1;
            }

            return result;
        }

        protected override void AddVisitedDaysToPassedParticipants(Guid[] passedParticipantIds, NiveauOptionsCollection niveauOptionsCollection, ISerializationService serializationService)
        {
            var courseDates = GetAllCourseDates(serializationService).ToArray();

            foreach (var participant in Participants)
            {
                foreach (var courseDay in courseDates)
                {
                    participant.Participant.VisitedCourseDays.Add(
                        new ParticipantVisitedCourseDay
                        {
                            Discipline = Discipline,
                            NiveauId = NiveauId,
                            NiveauName = niveauOptionsCollection.Where(no => no.Id == NiveauId).Select(no => no.Name).Single(),
                            DayStart = courseDay.Start,
                            DayDuration = courseDay.Duration
                        }
                    );
                }
            }
        }
    }
}