using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace SSAH.Infrastructure
{
    public class ConfigureOptionsFromConfiguration<T> : IConfigureNamedOptions<T>
        where T : class
    {
        private readonly string _name;
        private readonly IConfiguration _config;

        public ConfigureOptionsFromConfiguration(string name, IConfiguration config)
        {
            _name = name;
            _config = config;
        }

        public void Configure(T options)
        {
            Configure(_name, options);
        }

        public void Configure(string name, T options)
        {
            if (name == Options.DefaultName)
            {
                name = _name;
            }

            _config.Bind(name, options);
        }
    }
}