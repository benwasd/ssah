using NUnit.Framework;

namespace SSAH.Tests.Unit.Infrastructure.Services
{
    [TestFixture]
    public class PhoneNumberServiceTests
    {
        private SSAH.Infrastructure.Services.PhoneNumberService _service;

        [SetUp]
        public void SetUp()
        {
            _service = new SSAH.Infrastructure.Services.PhoneNumberService();
        }

        [TestCase("+41 79 778 12 12", "41797781212")]
        [TestCase("+41 79 778 12 1", "4179778121")]
        [TestCase("079 778 12 12", "41797781212")]
        public void Normalize(string number, string expectedResult)
        {
            // Arrange

            // Act
            var result = _service.NormalizePhoneNumber(number);

            // Act
            Assert.AreEqual(expectedResult, result);
        }

        [TestCase("+41 79 778 12 12", true)]
        [TestCase("+41 79 778 12 1", false)]
        [TestCase("079 778 12 12", true)]
        [TestCase("0", false)]
        [TestCase("Abc0123", false)]
        public void Validate(string number, bool expectedResult)
        {
            // Arrange

            // Act
            var result = _service.IsValidPhoneNumber(number);

            // Act
            Assert.AreEqual(expectedResult, result);
        }

        [TestCase("+41 79 778 12 12", true)]
        [TestCase("079 778 12 12", true)]
        [TestCase("078 778 12 12", true)]
        [TestCase("077 778 12 12", true)]
        [TestCase("075 778 12 12", true)]
        [TestCase("031 122 12 12", false)]
        [TestCase("033 122 12 12", false)]
        [TestCase("0", false)]
        [TestCase("Abc0123", false)]
        [TestCase("+41 778 12 22 B", false)]
        public void IsMobileNumber(string number, bool expectedResult)
        {
            // Arrange

            // Act
            var result = _service.IsMobilePhoneNumber(number);

            // Act
            Assert.AreEqual(expectedResult, result);
        }
    }
}