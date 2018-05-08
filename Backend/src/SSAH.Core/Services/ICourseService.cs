using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Services
{
    public interface ICourseService
    {
        IEnumerable<Course> GetPotentialGroupCourses(Discipline discipline, DateTime from, DateTime to);
    }
}