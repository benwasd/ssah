using System;

using SSAH.Core.Messaging;

namespace SSAH.Core.Domain.Messages
{
    public class CommittedCourseCreatedMessage : MessageBase, ICommitedCourseChangeMessage
    {
        public CommittedCourseCreatedMessage(Guid instructorId, Guid courseId)
        {
            InstructorId = instructorId;
            CourseId = courseId;
        }

        public Guid InstructorId { get; }

        public Guid CourseId { get; }
    }
}