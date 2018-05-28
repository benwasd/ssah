using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Threading.Tasks;

using Microsoft.Extensions.Options;

using SSAH.Core.Services;

namespace SSAH.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IOptions<SmsGatewayOptions> _options;
        private readonly ISerializationService _serializationService;

        public NotificationService(IOptions<SmsGatewayOptions> options, ISerializationService serializationService)
        {
            _options = options;
            _serializationService = serializationService;
        }

        public async Task SendSms(string phoneNumber, string message)
        {
            var contentDictionary = new Dictionary<string, string>
            {
                { "api_key", _options.Value.NexmoApiKey },
                { "api_secret", _options.Value.NexmoApiSecret },
                { "to", phoneNumber },
                { "from", "SSAH" },
                { "text", message.Replace("\r\n", "\n") }
            };

            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.PostAsync("https://rest.nexmo.com/sms/json", new FormUrlEncodedContent(contentDictionary));
                var responseContentString = await response.Content.ReadAsStringAsync();
                var result = _serializationService.Deserialize<Result>(responseContentString);

                if (!response.IsSuccessStatusCode)
                {
                    throw new HttpRequestException($"The request to nexmo.com json api failed, raw response content: {Environment.NewLine}{responseContentString}");
                }

                if (result.Messages.Count != result.MessageCount || result.Messages.Any(m => m.Status != 0))
                {
                    throw new HttpRequestException($"The request to nexmo.com json api failed: {Environment.NewLine}{string.Join(Environment.NewLine, result.Messages.Select(m => m.ErrorText))}");
                }
            }
        }

        [DataContract]
        private class Result
        {
            [DataMember(Name = "message-count")]
            public int MessageCount { get; set; }

            [DataMember(Name = "messages")]
            public ICollection<Message> Messages { get; set; }
        }

        [DataContract]
        private class Message
        {
            [DataMember(Name = "to")]
            public string To { get; set; }

            [DataMember(Name = "message-id")]
            public string MessageId { get; set; }

            [DataMember(Name = "status")]
            public int Status { get; set; }

            [DataMember(Name = "error-text")]
            public string ErrorText { get; set; }

            [DataMember(Name = "remaining-balance")]
            public decimal RemainingBalance { get; set; }

            [DataMember(Name = "message-price")]
            public decimal MessagePrice { get; set; }

            [DataMember(Name = "network")]
            public string Network { get; set; }
        }
    }
}