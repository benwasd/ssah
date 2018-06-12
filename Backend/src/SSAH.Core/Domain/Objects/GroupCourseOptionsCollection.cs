using System.Collections.ObjectModel;

using Microsoft.Extensions.Options;

namespace SSAH.Core.Domain.Objects
{
    public class GroupCourseOptionsCollection : Collection<GroupCourseOptions>
    {
        public const string NAME = "GroupCourseOptions";
    }

    public static class GroupCourseOptionsCollectionMonitorExtensions
    {
        public static GroupCourseOptionsCollection Current(this IOptionsMonitor<GroupCourseOptionsCollection> monitor)
        {
            return monitor.Get(GroupCourseOptionsCollection.NAME);
        }
    }
}