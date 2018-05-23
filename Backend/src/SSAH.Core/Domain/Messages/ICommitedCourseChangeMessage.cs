using System;

namespace SSAH.Core.Domain.Messages
{
    public interface ICommitedCourseChangeMessage   
    {
        Guid InstructorId { get; }

        Guid CourseId { get; }
    }
}