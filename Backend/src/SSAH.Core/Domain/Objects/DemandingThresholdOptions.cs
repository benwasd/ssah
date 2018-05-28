using Microsoft.Extensions.Options;

namespace SSAH.Core.Domain.Objects
{
    public class DemandingThresholdOptions
    {
        public const string NAME = "DemandingThresholdOptions";

        public int MinParticipants { get; set; }
    }

    public static class DemandingThresholdOptionsMonitorExtensions
    {
        public static DemandingThresholdOptions Current(this IOptionsMonitor<DemandingThresholdOptions> monitor)
        {
            return monitor.Get(DemandingThresholdOptions.NAME);
        }
    }
}