using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using SSAH.Core;
using SSAH.Core.Domain;
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
        private readonly ICourseRepository _courseRepository;
        private readonly ISerializationService _serializationService;
        private readonly IMapper _mapper;
        private readonly ICollectionMapper<RegistrationParticipantDto, RegistrationPartipiant> _collectionMapper;
        private readonly ICollectionMapper<CommitRegistrationParticipantDto, RegistrationPartipiant> _commitCollectionMapper;
        private readonly IOptions<GroupCourseOptionsCollection> _groupCourseOptions;
        private readonly INotificationService _notificationService;
        private readonly IQueue _queue;

        public RegistrationController(
            IUnitOfWork unitOfWork,
            IDemandService demandService,
            IRegistrationRepository registrationRepository,
            ICourseRepository courseRepository,
            ISerializationService serializationService,
            IMapper mapper,
            ICollectionMapper<RegistrationParticipantDto, RegistrationPartipiant> collectionMapper,
            ICollectionMapper<CommitRegistrationParticipantDto, RegistrationPartipiant> commitCollectionMapper,
            IOptions<GroupCourseOptionsCollection> groupCourseOptions,
            INotificationService notificationService,
            IQueue queue)
        {
            _unitOfWork = unitOfWork;
            _demandService = demandService;
            _registrationRepository = registrationRepository;
            _courseRepository = courseRepository;
            _serializationService = serializationService;
            _mapper = mapper;
            _collectionMapper = collectionMapper;
            _commitCollectionMapper = commitCollectionMapper;
            _queue = queue;
            _groupCourseOptions = groupCourseOptions;
            _notificationService = notificationService;
        }

        [HttpGet]
        public async Task Send()
        {
            await _notificationService.SendSms("41754125375", "Hallo");
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
        public RegistrationResultDto Register([FromBody] RegistrationDto registrationDto)
        {
            var model = _registrationRepository.CreateAndAdd();
            _mapper.Map(source: registrationDto, destination: model);
            _mapper.Map(source: registrationDto, destination: model.Applicant);
            _collectionMapper.MapCollection(source: registrationDto.Participants, destination: model.RegistrationPartipiant);

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
            _mapper.Map(source: registrationDto, destination: model);
            _mapper.Map(source: registrationDto, destination: model.Applicant);
            _collectionMapper.MapCollection(source: registrationDto.Participants, destination: model.RegistrationPartipiant);

            _unitOfWork.Commit();

            _queue.Publish(new InterestRegisteredChangedMessage(model.Id));

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
                    registration.AvailableFrom,
                    registration.AvailableTo,
                    includingRegistration: new RegistrationWithPartipiant { Registration = registration, RegistrationPartipiant = registrationPartipiant }
                );

                foreach (var groupCourseDemand in groupCourseDemands)
                {
                    yield return new PossibleCourseDto
                    {
                        RegistrationPartipiantId = registrationPartipiant.Id,
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
            _commitCollectionMapper.MapCollection(source: commitRegistrationDto.Participants, destination: registration.RegistrationPartipiant);

            var courseParticipants = registration.AddPartipiantsToProposalCourse(_groupCourseOptions, _courseRepository, _serializationService).ToArray();

            _unitOfWork.Commit();

            foreach (var courseParticipant in courseParticipants)
            {
                _queue.Publish(new PartipiantRegistredMessage(courseParticipant.ParticipantId, courseParticipant.CourseId));
            }            
        }
    }
}