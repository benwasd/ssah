using System.Threading.Tasks;

namespace SSAH.Core.Services
{
    public interface INotificationService
    {
        bool HasNotified(string phoneNumber, string notificationId, string subject);

        Task SendNotification(string phoneNumber, string notificationId, string subject, string message);
    }
}