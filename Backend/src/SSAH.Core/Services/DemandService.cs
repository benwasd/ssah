using System;
using System.Linq;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain;
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

        public void GetGroupCourseDemand(Discipline discipline, DateTime from, DateTime to)
        {
            var potentialCourses = _courseService.GetPotentialGroupCourses(discipline, from, to);

            foreach (var potentialCourse in potentialCourses)
            {
                var allX = potentialCourse.GetAllCourseDates(_serializationService).ToArray();
                var fromX = allX.First();
                var toX = allX.Last();
            }
        }
    }
}