using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class PartipiantRegistredMessage : MessageBase
    {
        public PartipiantRegistredMessage(Guid partipiantId, Guid proposalCourseId)
        {
            PartipiantId = partipiantId;
            ProposalCourseId = proposalCourseId;
        }

        public Guid PartipiantId { get; }

        public Guid ProposalCourseId { get; }
    }
}