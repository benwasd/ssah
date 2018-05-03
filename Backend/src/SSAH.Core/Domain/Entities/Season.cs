using System;
using System.ComponentModel.DataAnnotations;

namespace SSAH.Core.Domain.Entities
{
    public class Season : EntityBase
    {
        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string Label { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }
    }
}