namespace SSAH.Core.Collections
{
    public class CollectionItemPair<TSource, TDestination>
    {
        public CollectionItemPair(TSource sourceItem, TDestination destinationItem)
        {
            DestinationItem = destinationItem;
            SourceItem = sourceItem;
        }

        public TDestination DestinationItem { get; set; }

        public TSource SourceItem { get; set; }
    }
}