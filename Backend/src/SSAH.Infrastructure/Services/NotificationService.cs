using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

using Microsoft.Extensions.Options;

using SSAH.Core.Services;

namespace SSAH.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IOptionsMonitor<SmsGatewayOptions> _options;

        public NotificationService(IOptionsMonitor<SmsGatewayOptions> options)
        {
            _options = options;
        }

        public async Task SendSms(string phoneNumber, string message)
        {
            var contentDictionary = new Dictionary<string, string>
            {
                { "api_key", _options.Current().NexmoApiKey },
                { "api_secret", _options.Current().NexmoApiSecret },
                { "to", phoneNumber },
                { "from", "SSAH" },
                { "text", message.Replace("\r\n", "\n") }
            };

            using (var x = new HttpClient())
            {
                var response = await x.PostAsync("https://rest.nexmo.com/sms/json", new FormUrlEncodedContent(contentDictionary));
                if (!response.IsSuccessStatusCode)
                {
                    var responseContentString = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException($"The request to nexmo.com json api failed, raw response content: {Environment.NewLine}{responseContentString}");
                }
            }
        }
    }
}