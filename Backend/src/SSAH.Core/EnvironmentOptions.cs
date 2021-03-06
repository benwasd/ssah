﻿using Microsoft.Extensions.Options;

namespace SSAH.Core
{
    public class EnvironmentOptions
    {
        public const string NAME = "Environment";

        public string ConnectionString { get; set; }

        public string RegistrationFrontendUrl { get; set; }

        public string InstructorCourseDetailFrontendUrl { get; set; }
    }

    public static class EnvironmentOptionsMonitorExtensions
    {
        public static EnvironmentOptions Current(this IOptionsMonitor<EnvironmentOptions> monitor)
        {
            return monitor.Get(EnvironmentOptions.NAME);
        }
    }
}