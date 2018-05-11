using System.Threading.Tasks;

namespace SSAH.Core.Services
{
    public interface INotificationService
    {
        Task SendSms(string phoneNumber, string message);
    }
}