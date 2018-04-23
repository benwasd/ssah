using System.Collections.Generic;

namespace SSAH.Core.Domain.Entities
{
    public class Course : EntityBase
    {
        public string Lol { get; set; }

        public virtual ICollection<Participant> Participants { get; set; }
    }
}