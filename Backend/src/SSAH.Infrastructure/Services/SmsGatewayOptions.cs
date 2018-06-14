using Microsoft.Extensions.Options;

namespace SSAH.Infrastructure.Services
{
    public class SmsGatewayOptions
    {
        public const string NAME = "SmsGatewayOptions";

        public string NexmoApiKey { get; set; }

        public string NexmoApiSecret { get; set; }
    }

    public static class SmsGatewayOptionsMonitorExtensions
    {
        public static SmsGatewayOptions Current(this IOptionsMonitor<SmsGatewayOptions> monitor)
        {
            return monitor.Get(SmsGatewayOptions.NAME);
        }
    }
}