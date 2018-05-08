using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

using SSAH.Core;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;
using SSAH.Infrastructure.Api.Dtos;

namespace SSAH.Infrastructure.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class RegistrationController
    {
        private readonly IDemandService _demandService;

        public RegistrationController(IUnitOfWork unitOfWork, IDemandService demandService)
        {
            _demandService = demandService;
        }

        [HttpGet]
        public IEnumerable<OfferDto> GetOffers()
        {
            yield return new OfferDto { Type = CourseType.Group, Discipline = Discipline.Ski };
            yield return new OfferDto { Type = CourseType.Group, Discipline = Discipline.Snowboard };
        }

        [HttpPost]
        public void Register(RegistrationDto registration)
        {
        }

        [HttpGet]
        public IEnumerable<CourseDto> PossibleCourseDates()
        {
            _demandService.GetGroupCourseDemand(Discipline.Ski, DateTime.Today, DateTime.Today.AddDays(10));

            yield break;
        }
    }

    public class CourseDto
    {
    }
}