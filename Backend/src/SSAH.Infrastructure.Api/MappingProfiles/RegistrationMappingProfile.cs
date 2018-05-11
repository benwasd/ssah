﻿using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.Api.Dtos;
using SSAH.Infrastructure.Api.Mapping;

namespace SSAH.Infrastructure.Api.MappingProfiles
{
    public class RegistrationMappingProfile : MappingProfileBase
    {
        public RegistrationMappingProfile()
            : base("Registration")
        {
            MapEntitiesToDtos();
            MapDtosToEntities();
        }

        private void MapEntitiesToDtos()
        {
            CreateMap<Registration, RegistrationDto>()
                .ForMember(dest => dest.Givenname, opt => opt.MapFrom(src => src.Applicant.Givenname))
                .ForMember(dest => dest.Surname, opt => opt.MapFrom(src => src.Applicant.Surname))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Applicant.PhoneNumber))
                .ForMember(dest => dest.Residence, opt => opt.MapFrom(src => src.Applicant.Residence))
                .ForMember(dest => dest.RegistrationId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.RegistrationPartipiant));

            CreateEntityToDtoMap<RegistrationPartipiant, RegistrationParticipantDto>();
        }

        private void MapDtosToEntities()
        {
            CreateMap<RegistrationDto, Registration>()
                .ForMember(dest => dest.AvailableFrom, opt => opt.MapFrom(src => src.AvailableFrom))
                .ForMember(dest => dest.AvailableTo, opt => opt.MapFrom(src => src.AvailableTo))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<RegistrationDto, Applicant>()
                .ForMember(dest => dest.Givenname, opt => opt.MapFrom(src => src.Givenname))
                .ForMember(dest => dest.Surname, opt => opt.MapFrom(src => src.Surname))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.Residence, opt => opt.MapFrom(src => src.Residence))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateDtoToEntityMap<RegistrationParticipantDto, RegistrationPartipiant>()
                .ForMember(dest => dest.RegistrationId, opt => opt.Ignore())
                .ForMember(dest => dest.ResultingParticipantId, opt => opt.Ignore())
                .ForMember(dest => dest.ResultingParticipant, opt => opt.Ignore())
                .ForMember(dest => dest.Language, opt => opt.Ignore())
                .ForMember(dest => dest.AgeGroup, opt => opt.Ignore())
                .ForMember(dest => dest.CourseIdentifier, opt => opt.Ignore())
                .ForMember(dest => dest.CourseStartDate, opt => opt.Ignore());

            CreateDtoToEntityMap<CommitRegistrationParticipantDto, RegistrationPartipiant>()
                .ForMember(dest => dest.RegistrationId, opt => opt.Ignore())
                .ForMember(dest => dest.ResultingParticipantId, opt => opt.Ignore())
                .ForMember(dest => dest.ResultingParticipant, opt => opt.Ignore())
                .ForMember(dest => dest.Name, opt => opt.Ignore())
                .ForMember(dest => dest.CourseType, opt => opt.Ignore())
                .ForMember(dest => dest.Discipline, opt => opt.Ignore())
                .ForMember(dest => dest.NiveauId, opt => opt.Ignore());
        }
    }
}