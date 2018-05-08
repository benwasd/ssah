using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Services
{
    public class DemandService : IDemandService
    {
        private readonly ICourseService _courseService;
        private readonly IRegistrationRepository _registrationRepository;
        private readonly IOptions<DemandingThresholdOptions> _demandingThresholdOptions;
        private readonly ISerializationService _serializationService;

        public DemandService(ICourseService courseService, IRegistrationRepository registrationRepository, ICourseRepository courseRepository, IOptions<DemandingThresholdOptions> demandingThresholdOptions, ISerializationService serializationService)
        {
            _courseService = courseService;
            _registrationRepository = registrationRepository;
            _demandingThresholdOptions = demandingThresholdOptions;
            _serializationService = serializationService;
        }

        public IEnumerable<PotentialCourse> GetGroupCourseDemand(Discipline discipline, DateTime from, DateTime to)
        {
            var potentialCourses = _courseService.GetPotentialGroupCourses(discipline, from, to);
            var potentialPartipiants = _registrationRepository.GetRegisteredPartipiantOverlappingPeriod(discipline, from, to).ToArray();

            foreach (var potentialCourse in potentialCourses)
            {
                var courseDates = potentialCourse.GetAllCourseDates(_serializationService).OrderBy(cd => cd.Start).ToArray();
                var courseFrom = courseDates.First().Start;
                var courseTo = courseDates.Last().End;

                var demand = potentialPartipiants.Count(pp => pp.Registration.AvailableFrom <= courseFrom && courseTo <= pp.Registration.AvailableTo);

                if (from <= courseFrom && courseTo <= to)
                {
                    demand = demand + 1;
                }

                yield return new PotentialCourse { Course = potentialCourse, Demand = demand };
            }
        }
    }

    public class PotentialCourse
    {
        public Course Course { get; set; }

        public int Demand { get; set; }
    }
}