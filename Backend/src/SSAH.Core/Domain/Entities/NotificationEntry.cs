using System.ComponentModel.DataAnnotations;

namespace SSAH.Core.Domain.Entities
{
    public class NotificationEntry : EntityBase
    {
        [StringLength(Constants.StringLengths.NAME)]
        public string NotificationId { get; set; }

        [StringLength(Constants.StringLengths.CODE)]
        public string PhoneNumber { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
        public string NotificationSubject { get; set; }
    }
}