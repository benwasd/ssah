using System.Collections.ObjectModel;

using Microsoft.Extensions.Options;

namespace SSAH.Core.Domain.Objects
{
    public class NiveauOptionsCollection : Collection<NiveauOptions>
    {
        public const string NAME = "Niveaus";
    }

    public static class NiveauOptionsCollectionMonitorExtensions
    {
        public static NiveauOptionsCollection Current(this IOptionsMonitor<NiveauOptionsCollection> monitor)
        {
            return monitor.Get(NiveauOptionsCollection.NAME);
        }
	}
}