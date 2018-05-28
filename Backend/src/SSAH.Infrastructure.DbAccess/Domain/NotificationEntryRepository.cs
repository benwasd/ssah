using System.Linq;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.DbAccess.Domain
{
    public class NotificationEntryRepository : Repository<NotificationEntry>, INotificationEntryRepository
    {
        public NotificationEntryRepository(DbSet<NotificationEntry> set) 
            : base(set)
        {
        }

        public bool HasEntry(string phoneNumber, string notificationId, string subject)
        {
            return GetQuery().Any(e => e.PhoneNumber == phoneNumber && e.NotificationId == notificationId  && e.NotificationSubject == subject);
        }
    }
}