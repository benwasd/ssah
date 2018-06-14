using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class CommittedCourseChangedMessage : MessageBase, ICommitedCourseChangeMessage
    {
        public CommittedCourseChangedMessage(Guid? instructorId, Guid courseId)
        {
            InstructorId = instructorId;
            CourseId = courseId;
        }

        public Guid? InstructorId { get; }

        public Guid CourseId { get; }
    }
}