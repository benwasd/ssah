using SSAH.Core.Domain.Entities;

namespace SSAH.Core.Domain
{
    public interface INotificationEntryRepository : IRepository<NotificationEntry>
    {
        bool HasEntry(string phoneNumber, string notificationId, string subject);
    }
}