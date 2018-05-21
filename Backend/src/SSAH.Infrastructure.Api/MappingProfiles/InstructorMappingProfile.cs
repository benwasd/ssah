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
                .ForMember(dest => dest.ActualCourseStart, opt => opt.Ignore())
                .ForMember(dest => dest.CoursePeriods, opt => opt.ResolveUsing<CalleGetAllCourseDatesWithSerializationService>())
                .AfterMap((src, dest) =>
                {
                    dest.ActualCourseStart = dest.CoursePeriods.OrderBy(p => p.Start).First().Start;
                });

            CreateEntityToDtoMap<CourseParticipant, CourseParticipantDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Participant.Name))
                .ForMember(dest => dest.Language, opt => opt.MapFrom(src => src.Participant.Language))
                .ForMember(dest => dest.AgeGroup, opt => opt.MapFrom(src => src.Participant.AgeGroup))
                .ForMember(dest => dest.Residence, opt => opt.MapFrom(src => src.Participant.Applicant.Residence))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Participant.Applicant.PhoneNumber))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Participant.Name));
        }

        private void MapDtosToEntities()
        {
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