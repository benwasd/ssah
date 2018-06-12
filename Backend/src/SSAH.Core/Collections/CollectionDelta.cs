using System.Collections.Generic;

namespace SSAH.Core.Collections
{
    public class CollectionDelta<TSource, TDestination>
    {
        public List<TSource> Added { get; set; }

        public List<CollectionItemPair<TSource, TDestination>> Updated { get; set; }

        public List<TDestination> Removed { get; set; }
    }
}