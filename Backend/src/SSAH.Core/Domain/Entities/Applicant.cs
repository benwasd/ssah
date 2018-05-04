using System.ComponentModel.DataAnnotations;

namespace SSAH.Core.Domain.Entities
{
    public class Applicant : EntityBase
    {
        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string Surname { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string Givenname { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string Residence { get; set; }

        [StringLength(Constants.StringLengths.CODE)]
        [Required]
        public string PhoneNumber { get; set; }
    }
}