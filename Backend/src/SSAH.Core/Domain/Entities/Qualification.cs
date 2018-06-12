using System;
using System.ComponentModel.DataAnnotations;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public class Qualification : EntityBase
    {
        public Guid InstructorId { get; set; }

        public Discipline Discipline { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
        [Required]
        public string EducationTitle { get; set; }

        public int CompletionYear { get; set; }
    }
}