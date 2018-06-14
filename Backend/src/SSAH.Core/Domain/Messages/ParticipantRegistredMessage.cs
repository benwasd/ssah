using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class ParticipantRegistredMessage : MessageBase
    {
        public ParticipantRegistredMessage(Guid participantId, Guid proposalCourseId, Guid registrationId)
        {
            ParticipantId = participantId;
            ProposalCourseId = proposalCourseId;
            RegistrationId = registrationId;
        }

        public Guid ParticipantId { get; }

        public Guid ProposalCourseId { get; }

        public Guid RegistrationId { get; }
    }
}