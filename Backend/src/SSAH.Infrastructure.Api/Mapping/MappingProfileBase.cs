using System.Linq;

using AutoMapper;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.Api.Dtos;

namespace SSAH.Infrastructure.Api.Mapping
{
    public abstract class MappingProfileBase : Profile
    {
        protected MappingProfileBase(string profileName)
            : base(profileName)
        {
        }

        protected IMappingExpression<TEntity, TDto> CreateEntityToDtoMap<TEntity, TDto>()
            where TEntity : EntityBase
            where TDto : EntityDto
        {
            return CreateMap<TEntity, TDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.RowVersion, opt => opt.MapFrom(src => src.RowVersion));
        }

        protected IMappingExpression<TDto, TEntity> CreateDtoToEntityMap<TDto, TEntity>()
            where TDto : EntityDto
            where TEntity : EntityBase
        {
            return CreateMap<TDto, TEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedOn, opt => opt.Ignore())
                .ForMember(dest => dest.RowVersion, opt => opt.Condition(RowVersionCondition));
        }

        protected IMappingExpression<TDto, TEntity> CreateDtoToEntityMapWithId<TDto, TEntity>()
            where TDto : EntityDto
            where TEntity : EntityBase
        {
            return CreateMap<TDto, TEntity>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedOn, opt => opt.Ignore())
                .ForMember(dest => dest.RowVersion, opt => opt.Condition(RowVersionCondition));
        }

        private static bool RowVersionCondition<TDto, TEntity>(TDto sourceDto, TEntity destinationEntity)
            where TDto : EntityDto
            where TEntity : EntityBase
        {
            return destinationEntity.RowVersion == null || sourceDto.RowVersion == null || !destinationEntity.RowVersion.SequenceEqual(sourceDto.RowVersion);
        }
    }
}