using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Demanding
{
    public interface IDemandService
    {
        IEnumerable<GroupCourse> GetPotentialGroupCourses(Discipline discipline, int niveauId, DateTime from, DateTime to);

        IEnumerable<GroupCourseDemand> GetGroupCourseDemand(Discipline discipline, int niveauId, DateTime from, DateTime to, IEnumerable<RegistrationWithParticipant> includingRegistrations = null);

        IEnumerable<Instructor> GetAvailableInstructorsForGroupCourses(Discipline discipline, Period[] courseDates);
    }
}