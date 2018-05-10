using System;
using System.Collections.Generic;

using AutoMapper;

using SSAH.Core.Collections;
using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.Api.Dtos;

namespace SSAH.Infrastructure.Api.Mapping
{
    public class CollectionMapper<TSource, TDestination> : ICollectionMapper<TSource, TDestination>
        where TDestination : EntityBase
        where TSource : EntityDto
    {
        private readonly IRepository<TDestination> _repository;
        private readonly IMapper _mapper;

        public CollectionMapper(IRepository<TDestination> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual void MapCollection(IEnumerable<TSource> source, ICollection<TDestination> destination)
        {
            Guid SourceProperty(TSource x) => x.Id;
            Guid DestinationProperty(TDestination x) => x.Id;

            var delta = CollectionDeltaCalculator.CalculateCollectionDelta(source, destination, SourceProperty, DestinationProperty);

            delta.Added.ForEach(x => destination.Add(_mapper.Map(x, _repository.Create())));
            delta.Updated.ForEach(x => _mapper.Map(x.SourceItem, x.DestinationItem));
            delta.Removed.ForEach(_repository.Remove);
        }
    }
}