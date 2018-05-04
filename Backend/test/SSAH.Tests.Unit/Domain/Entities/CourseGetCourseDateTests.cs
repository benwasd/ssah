using System;
using System.Collections.Generic;
using System.Linq;

using NUnit.Framework;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;
using SSAH.Infrastructure.Services;

namespace SSAH.Tests.Unit
{
    [TestFixture]
    public class CourseGetCourseDateTests
    {
        [Test]
        public void GetAllCourseDates_ThreeWeekMondayFridayMorningCourse()
        {
            // Arrange
            var course = new Course();
            course.SetPeriodsOptions(SerializationService, ThreeWeekMondayFridayMorningCourse().ToList());
            course.StartDate = new DateTime(2018, 4, 30);

            // Act
            var result = course.GetAllCourseDates(SerializationService).ToArray();

            // Assert
            var allStartTimes = result.Select(r => r.Start);
            CollectionAssert.AreEqual(
                new[]
                {
                    new DateTime(2018, 4, 30, 8, 15, 0),
                    new DateTime(2018, 5, 4, 8, 15, 0),
                    new DateTime(2018, 5, 7, 8, 0, 0),
                    new DateTime(2018, 5, 11, 8, 0, 0),
                    new DateTime(2018, 5, 14, 7, 0, 0),
                    new DateTime(2018, 5, 18, 7, 0, 0)
                },
                allStartTimes
            );

            var allEndTimes = result.Select(r => r.End);
            CollectionAssert.AreEqual(
                new[]
                {
                    new DateTime(2018, 4, 30, 12, 0, 0),
                    new DateTime(2018, 5, 4, 12, 0, 0),
                    new DateTime(2018, 5, 7, 12, 0, 0),
                    new DateTime(2018, 5, 11, 12, 0, 0),
                    new DateTime(2018, 5, 14, 11, 0, 0),
                    new DateTime(2018, 5, 18, 11, 0, 0)
                },
                allEndTimes
            );
        }

        private ISerializationService SerializationService => new JsonSerializationService();

        private IEnumerable<GroupCoursePeriodOptions> ThreeWeekMondayFridayMorningCourse()
        {
            yield return new GroupCoursePeriodOptions { Day = DayOfWeek.Monday, StartTime = TimeSpan.Parse("8:15"), EndTime = TimeSpan.Parse("12:00") };
            yield return new GroupCoursePeriodOptions { Day = DayOfWeek.Friday, StartTime = TimeSpan.Parse("8:15"), EndTime = TimeSpan.Parse("12:00") };
            yield return new GroupCoursePeriodOptions { Week = 1, Day = DayOfWeek.Monday, StartTime = TimeSpan.Parse("8:00"), EndTime = TimeSpan.Parse("12:00") };
            yield return new GroupCoursePeriodOptions { Week = 1, Day = DayOfWeek.Friday, StartTime = TimeSpan.Parse("8:00"), EndTime = TimeSpan.Parse("12:00") };
            yield return new GroupCoursePeriodOptions { Week = 2, Day = DayOfWeek.Monday, StartTime = TimeSpan.Parse("7:00"), EndTime = TimeSpan.Parse("11:00") };
            yield return new GroupCoursePeriodOptions { Week = 2, Day = DayOfWeek.Friday, StartTime = TimeSpan.Parse("7:00"), EndTime = TimeSpan.Parse("11:00") };
        }
    }
}