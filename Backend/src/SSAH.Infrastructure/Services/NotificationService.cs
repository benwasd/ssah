using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

using SSAH.Core.Services;

namespace SSAH.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        public async Task SendSms(string phoneNumber, string message)
        {
            var contentDictionary = new Dictionary<string, string>();
            contentDictionary.Add("api_key", "15dba3a0");
            contentDictionary.Add("api_secret", "");
            contentDictionary.Add("to", phoneNumber);
            contentDictionary.Add("from", "SSAH");
            contentDictionary.Add("text", message);

            using (var x = new HttpClient())
            {
                var result = await x.PostAsync("https://rest.nexmo.com/sms/json", new FormUrlEncodedContent(contentDictionary));
            }
        }
    }
}