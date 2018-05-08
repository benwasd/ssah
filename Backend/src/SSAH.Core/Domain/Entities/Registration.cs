using System;
using System.Collections.Generic;

namespace SSAH.Core.Domain.Entities
{
    public class Registration : EntityBase
    {
        public Guid ApplicantId { get; set; }

        public virtual Applicant Applicant { get; set; }

        public DateTime AvailableFrom { get; set; }

        public DateTime AvailableTo { get; set; }

        public virtual ICollection<RegistrationPartipiant> RegistrationPartipiant { get; set; }
    }
}