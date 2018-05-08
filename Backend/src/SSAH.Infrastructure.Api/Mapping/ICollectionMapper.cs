using System.Collections.Generic;

using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.Api.Dtos;

namespace SSAH.Infrastructure.Api.Mapping
{
    public interface ICollectionMapper<in TSource, TDestination>
        where TDestination : EntityBase
        where TSource : EntityDto
    {
        void MapCollection(IEnumerable<TSource> source, ICollection<TDestination> destination);
    }
}