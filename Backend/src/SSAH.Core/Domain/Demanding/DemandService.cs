using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.Demanding
{
    public class DemandService : IDemandService
    {
        private readonly ICourseService _courseService;
        private readonly IRegistrationRepository _registrationRepository;
        private readonly IOptions<DemandingThresholdOptions> _demandingThresholdOptions;
        private readonly ISerializationService _serializationService;

        public DemandService(ICourseService courseService, IRegistrationRepository registrationRepository, IOptions<DemandingThresholdOptions> demandingThresholdOptions, ISerializationService serializationService)
        {
            _courseService = courseService;
            _registrationRepository = registrationRepository;
            _demandingThresholdOptions = demandingThresholdOptions;
            _serializationService = serializationService;
        }

        public IEnumerable<PotentialGroupCourse> GetGroupCourseDemand(Discipline discipline, DateTime from, DateTime to, RegistrationWithPartipiant includingRegistration = null)
        {
            var potentialPartipiants = TryAdd(_registrationRepository.GetRegisteredPartipiantOverlappingPeriod(discipline, from, to), includingRegistration).ToArray();
            var potentialPartipiantCriterias = potentialPartipiants.Select(DemandingCriterias.CreateFromRegistration).ToArray();
            var potentialCourses = _courseService.GetPotentialGroupCourses(discipline, from, to, potentialPartipiants.Select(pp => pp.RegistrationPartipiant.NiveauId).Distinct().ToArray());

            foreach (var potentialCourse in potentialCourses)
            {
                var courseCriterias = DemandingCriterias.CreateFromCourse(potentialCourse, _serializationService);

                var demand = potentialPartipiantCriterias.Count(pp => courseCriterias.Match(pp));

                if (demand >= _demandingThresholdOptions.Value.MinParticipants)
                {
                    // TODO: Add max partipiants, and instructor availability
                    yield return new PotentialGroupCourse { GroupCourse = potentialCourse, Demand = demand };
                }
            }
        }

        private static IEnumerable<RegistrationWithPartipiant> TryAdd(IEnumerable<RegistrationWithPartipiant> potentialPartipiants, RegistrationWithPartipiant toAdd)
        {
            return toAdd != null 
                ? potentialPartipiants.Concat(new[] { toAdd }) 
                : potentialPartipiants;
        }
    }
}