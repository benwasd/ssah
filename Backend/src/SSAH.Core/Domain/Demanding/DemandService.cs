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
        private readonly ISeasonRepository _seasonRepository;
        private readonly IOptions<GroupCourseOptionsCollection> _groupCourseOptionsCollection;
        private readonly IOptions<DemandingThresholdOptions> _demandingThresholdOptions;
        private readonly ISerializationService _serializationService;

        public DemandService(
            IRegistrationRepository registrationRepository,
            ISeasonRepository seasonRepository,
            IOptions<GroupCourseOptionsCollection> groupCourseOptionsCollection,
            IOptions<DemandingThresholdOptions> demandingThresholdOptions,
            ISerializationService serializationService)
        {
            _registrationRepository = registrationRepository;
            _seasonRepository = seasonRepository;
            _groupCourseOptionsCollection = groupCourseOptionsCollection;
            _demandingThresholdOptions = demandingThresholdOptions;
            _serializationService = serializationService;
        }

        public IEnumerable<GroupCourse> GetPotentialGroupCourses(Discipline discipline, DateTime from, DateTime to, int[] potentialNiveauIds)
        {
            var matchingGroupCourseOptions = _groupCourseOptionsCollection.Value.Where(gc => gc.Discipline == discipline && gc.ValidFrom <= from && to <= gc.ValidTo);
            var currentOrUpcommingSeasonStart = _seasonRepository.GetCurrentOrUpcommingOrThrow(DateTime.Today).Start;

            foreach (var groupCourseOption in matchingGroupCourseOptions)
            {
                var courseStartDate = CalculateFirstCourseStartLappingInPeriod(currentOrUpcommingSeasonStart, from, groupCourseOption);

                while (courseStartDate < to)
                {
                    foreach (var potentialNiveauId in potentialNiveauIds)
                    {
                        yield return CreateEarlyProposalGroupCourse(courseStartDate, potentialNiveauId, groupCourseOption);
                    }

                    courseStartDate = courseStartDate.AddDays(groupCourseOption.WeekInterval * 7);
                }
            }
        }

        public IEnumerable<GroupCourseDemand> GetGroupCourseDemand(Discipline discipline, DateTime from, DateTime to, IEnumerable<RegistrationWithPartipiant> includingRegistrations = null)
        {
            var potentialPartipiants = TryAdd(_registrationRepository.GetRegisteredPartipiantOverlappingPeriod(discipline, from, to), includingRegistrations).ToArray();
            var potentialPartipiantCriterias = potentialPartipiants.Select(DemandingCriterias.CreateFromRegistration).ToArray();
            var potentialCourses = GetPotentialGroupCourses(discipline, from, to, potentialPartipiants.Select(pp => pp.RegistrationPartipiant.NiveauId).Distinct().ToArray());

            foreach (var potentialCourse in potentialCourses)
            {
                var courseCriterias = DemandingCriterias.CreateFromCourse(potentialCourse, _serializationService);

                var demand = potentialPartipiantCriterias.Count(pp => courseCriterias.Match(pp));

                // TODO: Add max partipiants, and instructor availability
                if (demand >= _demandingThresholdOptions.Value.MinParticipants)
                {
                    yield return new GroupCourseDemand { GroupCourse = potentialCourse, Demand = demand };
                }
            }
        }

        private static IEnumerable<RegistrationWithPartipiant> TryAdd(IEnumerable<RegistrationWithPartipiant> potentialPartipiants, IEnumerable<RegistrationWithPartipiant> toAdd)
        {
            return toAdd != null 
                ? potentialPartipiants.Concat(toAdd) 
                : potentialPartipiants;
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