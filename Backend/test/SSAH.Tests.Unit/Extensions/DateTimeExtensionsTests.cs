using System;

using NUnit.Framework;

using SSAH.Core.Domain.Objects;
using SSAH.Core.Extensions;

namespace SSAH.Tests.Unit.Extensions
{
    [TestFixture]
    public class DateTimeExtensionsTests
    {
        [Test]
        public void WeekDiff_OneExactWeek()
        {
            // Arrange
            var date1 = new DateTime(2018, 1, 1);
            var date2 = new DateTime(2018, 1, 7);

            // Act
            var weeks1 = DateTimeExtensions.WeekDiff(date1, date2);
            var weeks2 = DateTimeExtensions.WeekDiff(date2, date1);

            // Assert
            Assert.AreEqual(0, weeks1);
            Assert.AreEqual(weeks2, weeks1);
        }

        [Test]
        public void WeekDiff_EightDays()
        {
            // Arrange
            var date1 = new DateTime(2018, 1, 1);
            var date2 = new DateTime(2018, 1, 8);

            // Act
            var weeks1 = DateTimeExtensions.WeekDiff(date1, date2);
            var weeks2 = DateTimeExtensions.WeekDiff(date2, date1);

            // Assert
            Assert.AreEqual(1, weeks1);
            Assert.AreEqual(weeks2, weeks1);
        }

        [Test]
        public void WeekDiff_UnevenLongPeriod()
        {
            // Arrange
            var date1 = new DateTime(2018, 1, 1);
            var date2 = new DateTime(2018, 1, 26);

            // Act
            var weeks1 = DateTimeExtensions.WeekDiff(date1, date2);
            var weeks2 = DateTimeExtensions.WeekDiff(date2, date1);

            // Assert
            Assert.AreEqual(3, weeks1);
            Assert.AreEqual(weeks2, weeks1);
        }

        [Test]
        public void WeekDiff_UnevenLongPeriodMondaySunday()
        {
            // Arrange
            var date1 = new DateTime(2018, 4, 30);
            var date2 = new DateTime(2018, 6, 10);

            // Act
            var weeks1 = DateTimeExtensions.WeekDiff(date1, date2);
            var weeks2 = DateTimeExtensions.WeekDiff(date2, date1);

            // Assert
            Assert.AreEqual(5, weeks1);
            Assert.AreEqual(weeks2, weeks1);
        }

        [Test]
        public void GetMondayOfWeek_OnMonday()
        {
            // Arrange
            var date = new DateTime(2018, 1, 1);

            // Act
            var result = date.GetMondayOfWeek();

            // Assert
            Assert.AreEqual(new DateTime(2018, 1, 1), result);
        }

        [Test]
        public void GetMondayOfWeek_OnThursday()
        {
            // Arrange
            var date = new DateTime(2018, 1, 4);

            // Act
            var result = date.GetMondayOfWeek();

            // Assert
            Assert.AreEqual(new DateTime(2018, 1, 1), result);
        }

        [Test]
        public void GetMondayOfWeek_OnSunday()
        {
            // Arrange
            var date = new DateTime(2018, 1, 7);

            // Act
            var result = date.GetMondayOfWeek();

            // Assert
            Assert.AreEqual(new DateTime(2018, 1, 1), result);
        }

        [Test]
        public void Overlaps_MinuteOverlapping()
        {
            // Arrange
            var periodA = new[] { new Period(new DateTime(2018, 1, 1, 8, 0, 0), TimeSpan.FromHours(2)) };
            var periodB = new[] { new Period(new DateTime(2018, 1, 1, 9, 59, 0), TimeSpan.FromHours(2)) };

            // Act
            var resultA = periodA.Overlaps(periodB);
            var resultB = periodB.Overlaps(periodA);

            // Assert
            Assert.AreEqual(true, resultA);
            Assert.AreEqual(true, resultB);
        }

        [Test]
        public void Overlaps_EqualOverlapping()
        {
            // Arrange
            var periodA = new[] { new Period(new DateTime(2018, 1, 1, 8, 0, 0), TimeSpan.FromHours(2)) };
            var periodB = new[] { new Period(new DateTime(2018, 1, 1, 10, 0, 0), TimeSpan.FromHours(2)) };

            // Act
            var resultA = periodA.Overlaps(periodB);
            var resultB = periodB.Overlaps(periodA);

            // Assert
            Assert.AreEqual(true, resultA);
            Assert.AreEqual(true, resultB);
        }

        [Test]
        public void Overlaps_Matching()
        {
            // Arrange
            var periodA = new[]
            {
                new Period(new DateTime(2018, 1, 1, 8, 0, 0), TimeSpan.FromMinutes(119)),
                new Period(new DateTime(2018, 1, 1, 18, 0, 0), TimeSpan.FromHours(2))
            };

            var periodB = new[]
            {
                new Period(new DateTime(2018, 1, 1, 10, 0, 0), TimeSpan.FromHours(8).Subtract(TimeSpan.FromMinutes(1)))
            };

            // Act
            var resultA = periodA.Overlaps(periodB);
            var resultB = periodB.Overlaps(periodA);

            // Assert
            Assert.AreEqual(false, resultA);
            Assert.AreEqual(false, resultB);
        }
    }
}