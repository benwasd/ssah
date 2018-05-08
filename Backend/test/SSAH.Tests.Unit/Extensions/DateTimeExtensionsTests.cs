using System;

using NUnit.Framework;

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
            Assert.AreEqual(weeks1, 1);
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
            Assert.AreEqual(weeks1, 1);
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
            Assert.AreEqual(weeks1, 3);
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
    }
}