using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Core.Domain.Demanding;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;
using SSAH.Infrastructure.Api.Dtos;
using SSAH.Infrastructure.Api.Mapping;

namespace SSAH.Infrastructure.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class RegistrationController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDemandService _demandService;
        private readonly IRegistrationRepository _registrationRepository;
        private readonly ISerializationService _serializationService;
        private readonly IMapper _mapper;
        private readonly ICollectionMapper<RegistrationParticipantDto, RegistrationPartipiant> _collectionMapper;

        public RegistrationController(IUnitOfWork unitOfWork, IDemandService demandService, IRegistrationRepository registrationRepository, ISerializationService serializationService, IMapper mapper, ICollectionMapper<RegistrationParticipantDto, RegistrationPartipiant> collectionMapper)
        {
            _unitOfWork = unitOfWork;
            _demandService = demandService;
            _registrationRepository = registrationRepository;
            _serializationService = serializationService;
            _mapper = mapper;
            _collectionMapper = collectionMapper;
        }

        [HttpGet]
        public async Task<RegistrationDto> GetRegistration(Guid registrationId)
        {
            var registration = await _registrationRepository.GetByIdAsync(registrationId);
            return _mapper.Map<RegistrationDto>(registration);
        }

        [HttpGet]
        public async Task<IEnumerable<RegistrationDto>> GetRegistrations(Guid applicantId)
        {
            var registrations = await _registrationRepository.GetByApplicant(applicantId);
            return registrations.Select(_mapper.Map<RegistrationDto>);
        }

        [HttpPost]
        public RegistrationResultDto Register(RegistrationDto registrationDto)
        {
            var model = _registrationRepository.CreateAndAdd();
            _mapper.Map(source: registrationDto, destination: model);

            model.Applicant = new Applicant();
            _mapper.Map(source: registrationDto, destination: model.Applicant);

            model.RegistrationPartipiant = new List<RegistrationPartipiant>();
            _collectionMapper.MapCollection(source: registrationDto.Participants, destination: model.RegistrationPartipiant);

            _unitOfWork.Commit();

            // TODO: Emit Message on Bus

            return new RegistrationResultDto
            {
                ApplicantId = model.ApplicantId,
                RegistrationId = model.Id
            };
        }

        [HttpGet]
        public IEnumerable<PossibleCourseDto> PossibleCourseDatesPerPartipiant(Guid registrationId)
        {
            var registration = _registrationRepository.GetById(registrationId);

            // TODO: Do this functional

            foreach (var registrationPartipiant in registration.RegistrationPartipiant)
            {
                var groupCourseDemands = _demandService.GetGroupCourseDemand(
                    registrationPartipiant.Discipline,
                    registration.AvailableFrom, registration.AvailableTo,
                    includingRegistration: new RegistrationWithPartipiant { Registration = registration, RegistrationPartipiant = registrationPartipiant }
                );

                foreach (var groupCourseDemand in groupCourseDemands)
                {
                    yield return new PossibleCourseDto
                    {
                        RegistrationPartipiantId = registrationPartipiant.Id,
                        CoursePeriods = groupCourseDemand.Course.GetAllCourseDates(_serializationService).ToList()
                    };
                }
            }
        }

        [HttpPost]
        public async Task CommitRegistration(CommitRegistrationDto commitRegistrationDto)
        {
            var registration = await _registrationRepository.GetByIdAsync(commitRegistrationDto.RegistrationId);

            foreach (var registrationPartipiant in registration.RegistrationPartipiant)
            {
                var commitRegistrationPartipiant = commitRegistrationDto.Participants.First(p => p.RegistrationParticipantId == registrationPartipiant.Id);

                await registrationPartipiant.CommitAsync(registration, commitRegistrationPartipiant.AgeGroup, commitRegistrationPartipiant.Language);
            }
        }
    }
}