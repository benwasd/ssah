using System;
using System.Collections.Generic;
using System.Linq;

using AutoMapper;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;
using SSAH.Infrastructure.Api.Dtos;
using SSAH.Infrastructure.Api.Mapping;

namespace SSAH.Infrastructure.Api.MappingProfiles
{
    public class InstructorMappingProfile : MappingProfileBase
    {
        public InstructorMappingProfile() 
            : base("Instructor")
        {
            MapEntitiesToDtos();
            MapDtosToEntities();
        }

        private void MapEntitiesToDtos()
        {
            CreateEntityToDtoMap<GroupCourse, CourseDto>()
                .ForMember(dest => dest.CourseType, opt => opt.MapFrom(src => CourseType.Group))
                .ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src.Participants.Select(p => p.Participant)))
                .ForMember(dest => dest.ActualCourseStart, opt => opt.Ignore())
                .ForMember(dest => dest.CoursePeriods, opt => opt.ResolveUsing<CalleGetAllCourseDatesWithSerializationService>())
                .ForMember(dest => dest.LastModificationDate, opt => opt.MapFrom(src => GetLastModification(src)))
                .AfterMap((src, dest) =>
                {
                    dest.ActualCourseStart = dest.CoursePeriods.OrderBy(p => p.Start).First().Start;
                });

            CreateEntityToDtoMap<Participant, CourseParticipantDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Language, opt => opt.MapFrom(src => src.Language))
                .ForMember(dest => dest.AgeGroup, opt => opt.MapFrom(src => src.AgeGroup))
                .ForMember(dest => dest.Residence, opt => opt.MapFrom(src => src.Applicant.Residence))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Applicant.PhoneNumber))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
        }
        
        private void MapDtosToEntities()
        {
        }

        private static DateTime GetLastModification(Course src)
        {
            return src.Participants
                .SelectMany(p => new[] { p.ModifiedOn, p.CreatedOn })
                .Concat(new[] { src.ModifiedOn, src.CreatedOn })
                .Where(d => d != null)
                .Select(d => d.Value)
                .Max();
        }

        public class CalleGetAllCourseDatesWithSerializationService : IValueResolver<GroupCourse, CourseDto, ICollection<Period>>
        {
            public ICollection<Period> Resolve(GroupCourse source, CourseDto destination, ICollection<Period> destMember, ResolutionContext context)
            {
                return source.GetAllCourseDates(context.Mapper.ServiceCtor(typeof(ISerializationService)) as ISerializationService).ToArray();
            }
        }
    }
}