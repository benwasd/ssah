using System.Collections.Generic;

using Autofac;

using AutoMapper;

namespace SSAH.Infrastructure.Api.Mapping
{
    public class MapperFactory
    {
        private readonly IConfigurationProvider _mapperConfiguration;

        public MapperFactory(IEnumerable<MappingProfileBase> mappingProfiles)
        {
            _mapperConfiguration = new MapperConfiguration(configuration =>
            {
                foreach (var profile in mappingProfiles)
                {
                    configuration.AddProfile(profile);
                }
            });

            _mapperConfiguration.CompileMappings();
            _mapperConfiguration.AssertConfigurationIsValid();
        }

        public IMapper GetMapper(ILifetimeScope lifetimeScope)
        {
            return new Mapper(_mapperConfiguration, lifetimeScope.Resolve);
        }
    }
}