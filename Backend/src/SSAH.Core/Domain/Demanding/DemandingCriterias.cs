using System;
using System.Linq;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.Demanding
{
    public class DemandingCriterias
    {
        private DemandingCriterias()
        {
        }

        public static DemandingCriterias CreateFromRegistration(RegistrationWithParticipant registrationWithParticipant)
        {
            return new DemandingCriterias
            {
                CourseType = registrationWithParticipant.RegistrationParticipant.CourseType,
                Discipline = registrationWithParticipant.RegistrationParticipant.Discipline,
                NiveauId = registrationWithParticipant.RegistrationParticipant.NiveauId,
                From = registrationWithParticipant.Registration.AvailableFrom.Date,
                To = registrationWithParticipant.Registration.AvailableTo.Date,
                IsCourse = false
            };
        }

        public static DemandingCriterias CreateFromCourse(GroupCourse course, ISerializationService serializationService)
        {
            var courseDates = course.GetAllCourseDates(serializationService).ToArray();

            return new DemandingCriterias
            {
                CourseType = CourseType.Group,
                Discipline = course.Discipline,
                NiveauId = course.NiveauId,
                From = courseDates.First().Start.Date,
                To = courseDates.First().End.Date,
                IsCourse = true
            };
        }

        public CourseType CourseType { get; private set; }

        public Discipline Discipline { get; private set; }

        public int NiveauId { get; private set; }

        public DateTime From { get; private set; }

        public DateTime To { get; private set; }

        private bool IsCourse { get; set; }

        public bool Match(DemandingCriterias otherCriteria)
        {
            var periodMatch = IsCourse
                ? otherCriteria.From <= From && To <= otherCriteria.To
                : From <= otherCriteria.From && otherCriteria.To <= To;

            return CourseType == otherCriteria.CourseType
                && Discipline == otherCriteria.Discipline
                && NiveauId == otherCriteria.NiveauId
                && periodMatch;
        }
    }
}