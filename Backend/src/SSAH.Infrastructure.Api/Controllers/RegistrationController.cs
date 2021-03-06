﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Core.Domain.CourseCreation;
using SSAH.Core.Domain.Demanding;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Messages;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Messaging;
using SSAH.Core.Services;
using SSAH.Infrastructure.Api.Dtos;
using SSAH.Infrastructure.Api.Mapping;

namespace SSAH.Infrastructure.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class RegistrationController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDemandService _demandService;
        private readonly IRegistrationRepository _registrationRepository;
        private readonly ICourseCreationService _courseCreationService;
        private readonly ISerializationService _serializationService;
        private readonly IMapper _mapper;
        private readonly ICollectionMapper<RegistrationParticipantDto, RegistrationParticipant> _collectionMapper;
        private readonly ICollectionMapper<CommitRegistrationParticipantDto, RegistrationParticipant> _commitCollectionMapper;
        private readonly IOptions<GroupCourseOptionsCollection> _groupCourseOptions;
        private readonly IQueue _queue;

        public RegistrationController(
            IUnitOfWork unitOfWork,
            IDemandService demandService,
            IRegistrationRepository registrationRepository,
            ICourseCreationService courseCreationService,
            ISerializationService serializationService,
            IMapper mapper,
            ICollectionMapper<RegistrationParticipantDto, RegistrationParticipant> collectionMapper,
            ICollectionMapper<CommitRegistrationParticipantDto, RegistrationParticipant> commitCollectionMapper,
            IOptions<GroupCourseOptionsCollection> groupCourseOptions,
            IQueue queue)
        {
            _unitOfWork = unitOfWork;
            _demandService = demandService;
            _registrationRepository = registrationRepository;
            _courseCreationService = courseCreationService;
            _serializationService = serializationService;
            _mapper = mapper;
            _collectionMapper = collectionMapper;
            _commitCollectionMapper = commitCollectionMapper;
            _groupCourseOptions = groupCourseOptions;
            _queue = queue;
        }

        [HttpGet]
        public async Task<RegistrationDto> GetRegistration(Guid registrationId)
        {
            var registration = await _registrationRepository.GetByIdAsync(registrationId);
            return _mapper.Map<RegistrationDto>(registration);
        }

        [HttpGet]
        public async Task<IEnumerable<RegistrationOverviewDto>> GetRegistrations(Guid applicantId)
        {
            var registrations = await _registrationRepository.GetByApplicantAsync(applicantId);
            return registrations.Select(_mapper.Map<RegistrationOverviewDto>);
        }

        [HttpPost]
        public RegistrationResultDto Register([FromBody] RegistrationDto registrationDto)
        {
            var model = _registrationRepository.CreateAndAdd();
            _mapper.Map(source: registrationDto, destination: model);
            _mapper.Map(source: registrationDto, destination: model.Applicant);
            _collectionMapper.MapCollection(source: registrationDto.Participants, destination: model.RegistrationParticipants);

            _unitOfWork.Commit();

            _queue.Publish(new InterestRegisteredMessage(model.Id));

            return new RegistrationResultDto
            {
                ApplicantId = model.ApplicantId,
                RegistrationId = model.Id
            };
        }

        [HttpPost]
        public RegistrationResultDto Update([FromBody] RegistrationDto registrationDto)
        {
            if (!registrationDto.RegistrationId.HasValue)
            {
                throw new InvalidOperationException("No registration id provided. Can not update registration.");
            }

            var model = _registrationRepository.GetById(registrationDto.RegistrationId.Value);

            if (model.Status == RegistrationStatus.Committed)
            {
                throw new InvalidOperationException("The registration is already committed.");
            }

            _mapper.Map(source: registrationDto, destination: model);
            _mapper.Map(source: registrationDto, destination: model.Applicant);
            _collectionMapper.MapCollection(source: registrationDto.Participants, destination: model.RegistrationParticipants);

            _unitOfWork.Commit();

            _queue.Publish(new InterestRegisteredChangedMessage(model.Id));

            return new RegistrationResultDto
            {
                ApplicantId = model.ApplicantId,
                RegistrationId = model.Id
            };
        }

        [HttpGet]
        public IEnumerable<PossibleCourseDto> PossibleCourseDatesPerParticipant(Guid registrationId)
        {
            var registration = _registrationRepository.GetById(registrationId);

            // TODO: Do this functional

            foreach (var participant in registration.RegistrationParticipants)
            {
                var groupCourseDemands = _demandService.GetGroupCourseDemand(
                    participant.Discipline,
                    participant.NiveauId,
                    registration.AvailableFrom,
                    registration.AvailableTo
                );

                foreach (var groupCourseDemand in groupCourseDemands)
                {
                    yield return new PossibleCourseDto
                    {
                        RegistrationParticipantId = participant.Id,
                        Identifier = groupCourseDemand.GroupCourse.OptionsIdentifier,
                        StartDate = groupCourseDemand.GroupCourse.StartDate,
                        CoursePeriods = groupCourseDemand.GroupCourse.GetAllCourseDates(_serializationService).ToList()
                    };
                }
            }
        }

        [HttpPost]
        public async Task CommitRegistration([FromBody] CommitRegistrationDto commitRegistrationDto)
        {
            var registration = await _registrationRepository.GetByIdAsync(commitRegistrationDto.RegistrationId);
            _commitCollectionMapper.MapCollection(source: commitRegistrationDto.Participants, destination: registration.RegistrationParticipants);

            var courseParticipants = registration.AddParticipantsToProposalCourse(_groupCourseOptions, _courseCreationService).ToArray();

            _unitOfWork.Commit();

            foreach (var courseParticipant in courseParticipants)
            {
                _queue.Publish(new ParticipantRegistredMessage(courseParticipant.ParticipantId, courseParticipant.CourseId, registration.Id));
            }
        }
    }
}