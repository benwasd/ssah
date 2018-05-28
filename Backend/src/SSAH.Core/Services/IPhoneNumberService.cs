namespace SSAH.Core.Services
{
    public interface IPhoneNumberService
    {
        string NormalizePhoneNumber(string phoneNumber);

        bool IsValidPhoneNumber(string phoneNumber);

        bool IsMobilePhoneNumber(string phoneNumber);
    }
}