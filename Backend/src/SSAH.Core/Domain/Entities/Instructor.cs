using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace SSAH.Core.Domain.Entities
{
    public class Instructor : EntityBase
    {
        public Instructor()
        {
            Qualifications = new Collection<Qualification>();
        }

        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string Surname { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string Givenname { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [StringLength(Constants.StringLengths.CODE)]
        [Required]
        public string PhoneNumber { get; set; }

        public virtual ICollection<Qualification> Qualifications { get; set; }
    }
}