using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class ParticipantRegistredMessage : MessageBase
    {
        public ParticipantRegistredMessage(Guid participantId, Guid proposalCourseId)
        {
            ParticipantId = participantId;
            ProposalCourseId = proposalCourseId;
        }

        public Guid ParticipantId { get; }

        public Guid ProposalCourseId { get; }
    }
}