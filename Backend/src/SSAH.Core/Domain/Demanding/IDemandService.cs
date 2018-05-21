using System;
using System.Collections.Generic;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Demanding
{
    public interface IDemandService
    {
        IEnumerable<GroupCourse> GetPotentialGroupCourses(Discipline discipline, DateTime from, DateTime to, int[] potentialNiveauIds);

        IEnumerable<GroupCourseDemand> GetGroupCourseDemand(Discipline discipline, DateTime from, DateTime to, IEnumerable<RegistrationWithParticipant> includingRegistrations = null);
    }
}