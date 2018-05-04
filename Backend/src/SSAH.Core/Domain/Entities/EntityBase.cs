using System;
using System.ComponentModel.DataAnnotations;

namespace SSAH.Core.Domain.Entities
{
    public abstract class EntityBase
    {
        protected EntityBase()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string CreatedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
        public string ModifiedBy { get; set; }

        public byte[] RowVersion { get; set; }
    }
}