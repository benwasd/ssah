 using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Extensions;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.Demanding
{
    public class DemandService : IDemandService
    {
        private readonly IRegistrationRepository _registrationRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly ISeasonRepository _seasonRepository;
        private readonly IRepository<Instructor> _instructorRepository;
        private readonly IOptions<GroupCourseOptionsCollection> _groupCourseOptionsCollection;
        private readonly IOptions<DemandingThresholdOptions> _demandingThresholdOptions;
        private readonly ISerializationService _serializationService;

        public DemandService(
            IRegistrationRepository registrationRepository,
            ICourseRepository courseRepository,
            ISeasonRepository seasonRepository,
            IRepository<Instructor> instructorRepository,
            IOptions<GroupCourseOptionsCollection> groupCourseOptionsCollection,
            IOptions<DemandingThresholdOptions> demandingThresholdOptions,
            ISerializationService serializationService)
        {
            _registrationRepository = registrationRepository;
            _courseRepository = courseRepository;
            _seasonRepository = seasonRepository;
            _instructorRepository = instructorRepository;
            _groupCourseOptionsCollection = groupCourseOptionsCollection;
            _demandingThresholdOptions = demandingThresholdOptions;
            _serializationService = serializationService;
        }

        public IEnumerable<GroupCourse> GetPotentialGroupCourses(Discipline discipline, int niveauId, DateTime from, DateTime to)
        {
            var matchingGroupCourseOptions = _groupCourseOptionsCollection.Value.Where(gc => gc.Discipline == discipline && gc.ValidFrom <= from && to <= gc.ValidTo);
            var currentOrUpcommingSeasonStart = _seasonRepository.GetCurrentOrUpcommingOrThrow(DateTime.Today).Start;

            foreach (var groupCourseOption in matchingGroupCourseOptions)
            {
                var courseStartDate = CalculateFirstCourseStartLappingInPeriod(currentOrUpcommingSeasonStart, from, groupCourseOption);

                while (courseStartDate < to)
                {
                    yield return CreateEarlyProposalGroupCourse(courseStartDate, niveauId, groupCourseOption);

                    courseStartDate = courseStartDate.AddDays(groupCourseOption.WeekInterval * 7);
                }
            }
        }

        public IEnumerable<GroupCourseDemand> GetGroupCourseDemand(Discipline discipline, int niveauId, DateTime from, DateTime to, IEnumerable<RegistrationWithParticipant> includingRegistrations = null)
        {
            var potentialParticipants = TryAdd(_registrationRepository.GetRegisteredParticipantOverlappingPeriod(discipline, niveauId, from, to), includingRegistrations).ToArray();
            var potentialParticipantCriterias = potentialParticipants.Select(DemandingCriterias.CreateFromRegistration).ToArray();
            var potentialCourses = GetPotentialGroupCourses(discipline, niveauId, from, to);

            foreach (var potentialCourse in potentialCourses)
            {
                var courseCriterias = DemandingCriterias.CreateFromCourse(potentialCourse, _serializationService);

                var demand = potentialParticipantCriterias.Count(pp => courseCriterias.Match(pp));

                // Feature Proposal: https://github.com/benwasd/ssah/issues/54
                // Consider instructor availabilities here and compare with MaximalBoundedInstructorCount of early proposal and proposal courses.

                if (demand >= _demandingThresholdOptions.Value.MinParticipants)
                {
                    yield return new GroupCourseDemand { GroupCourse = potentialCourse, Demand = demand };
                }
            }
        }

        public IEnumerable<Instructor> GetAvailableInstructorsForGroupCourses(Discipline discipline, Period[] courseDates)
        {
            // Feature Proposal: https://github.com/benwasd/ssah/issues/54
            // Respect instructor disposition here

            var instructors = _instructorRepository.Get();

            foreach (var instructor in instructors)
            {
                var coursesOfInstructor = _courseRepository.GetAllGroupCourses(instructor.Id, CourseStatus.Committed);
                var isInstructorPlaned = false;

                foreach (var courseOfInstructor in coursesOfInstructor)
                {
                    var courseOfInstructorDates = courseOfInstructor.GetAllCourseDates(_serializationService);

                    isInstructorPlaned |= courseOfInstructorDates.Overlaps(courseDates);

                    if (isInstructorPlaned)
                    {
                        break;
                    }
                }

                if (!isInstructorPlaned)
                {
                    yield return instructor;
                }
            }
        }

        private static IEnumerable<RegistrationWithParticipant> TryAdd(IEnumerable<RegistrationWithParticipant> potentialParticipants, IEnumerable<RegistrationWithParticipant> toAdd)
        {
            return toAdd != null 
                ? potentialParticipants.Concat(toAdd) 
                : potentialParticipants;
        }

        private DateTime CalculateFirstCourseStartLappingInPeriod(DateTime currentOrUpcommingSeasonStart, DateTime from, GroupCourseOptions groupCourseOptions)
        {
            var weeksSinceSeasonStart = DateTimeExtensions.WeekDiff(currentOrUpcommingSeasonStart, from);
            var offset = (int)Math.Ceiling((double)weeksSinceSeasonStart / groupCourseOptions.WeekInterval);

            return currentOrUpcommingSeasonStart.AddDays(offset * 7);
        }

        private GroupCourse CreateEarlyProposalGroupCourse(DateTime courseStartDate, int niveauId, GroupCourseOptions groupCourseOptions)
        {
            return new GroupCourse(groupCourseOptions.Discipline, CourseStatus.EarlyProposal, niveauId, courseStartDate)
                .SetPeriodsOptions(_serializationService, groupCourseOptions);
        }
    }
}