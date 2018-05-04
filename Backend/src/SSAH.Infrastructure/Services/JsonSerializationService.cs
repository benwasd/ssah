using System;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

using SSAH.Core.Services;

namespace SSAH.Infrastructure.Services
{
    public class JsonSerializationService : ISerializationService
    {
        private readonly JsonSerializerSettings _serializationSettings;

        public JsonSerializationService()
        {
            _serializationSettings = GetSettings();
        }

        public T Deserialize<T>(string json)
        {
            if (string.IsNullOrEmpty(json))
            {
                return default(T);
            }

            return JsonConvert.DeserializeObject<T>(json, _serializationSettings);
        }

        public string Serialize<T>(T value)
        {
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }

            return JsonConvert.SerializeObject(value, _serializationSettings);
        }

        private static JsonSerializerSettings GetSettings()
        {
            var settings = new JsonSerializerSettings();
            settings.Converters.Add(new StringEnumConverter());
            settings.NullValueHandling = NullValueHandling.Ignore;

            return settings;
        }
    }
}