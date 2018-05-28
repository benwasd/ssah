using PhoneNumbers;

using SSAH.Core.Services;

namespace SSAH.Infrastructure.Services
{
    public class PhoneNumberService : IPhoneNumberService
    {
        private readonly PhoneNumberUtil _utils = PhoneNumberUtil.GetInstance();

        public string NormalizePhoneNumber(string phoneNumber)
        {
            var number = _utils.Parse(phoneNumber, "CH");

            return $"{number.CountryCode}{number.NationalNumber}";
        }

        public bool IsValidPhoneNumber(string phoneNumber)
        {
            try
            {
                var normalizedNumber = NormalizePhoneNumber(phoneNumber);
                var number = _utils.Parse(normalizedNumber, "CH");

                return _utils.IsValidNumber(number);
            }
            catch (NumberParseException)
            {
                return false;
            }
        }

        public bool IsMobilePhoneNumber(string phoneNumber)
        {
            try
            {
                var normalizedNumber = NormalizePhoneNumber(phoneNumber);
                var number = _utils.Parse(normalizedNumber, "CH");
                var numberType = _utils.GetNumberType(number);

                return numberType == PhoneNumberType.MOBILE || numberType == PhoneNumberType.FIXED_LINE_OR_MOBILE;
            }
            catch (NumberParseException)
            {
                return false;
            }
        }
    }
}