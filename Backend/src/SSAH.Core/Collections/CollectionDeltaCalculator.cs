using System;
using System.Collections.Generic;
using System.Linq;

namespace SSAH.Core.Collections
{
    public static class CollectionDeltaCalculator
    {
        public static CollectionDelta<TSource, TDestination> CalculateCollectionDelta<TSource, TDestination, TComparison>(
            IEnumerable<TSource> source, IEnumerable<TDestination> destination,
            Func<TSource, TComparison> sourceComparator,
            Func<TDestination, TComparison> destinationComparator)
                where TComparison : struct, IComparable
        {
            var addedItems = new List<TSource>();
            var updatedItems = new List<CollectionItemPair<TSource, TDestination>>();
            var removedItems = new List<TDestination>();

            var sortedSource = source.OrderBy(sourceComparator).ToList();
            var sortedDestination = destination.OrderBy(destinationComparator).ToList();

            var i = 0;
            var j = 0;
            while (i < sortedDestination.Count && j < sortedSource.Count)
            {
                if (AreEqual(destinationComparator(sortedDestination[i]), sourceComparator(sortedSource[j])))
                {
                    updatedItems.Add(new CollectionItemPair<TSource, TDestination>(sortedSource[j], sortedDestination[i]));
                    i++;
                    j++;
                }
                else if (IsSmallerThan(destinationComparator(sortedDestination[i]), sourceComparator(sortedSource[j])))
                {
                    removedItems.Add(sortedDestination[i]);
                    i++;
                }
                else
                {
                    addedItems.Add(sortedSource[j]);
                    j++;
                }
            }

            while (i < sortedDestination.Count)
            {
                removedItems.Add(sortedDestination[i]);
                i++;
            }

            while (j < sortedSource.Count)
            {
                addedItems.Add(sortedSource[j]);
                j++;
            }

            return new CollectionDelta<TSource, TDestination>
            {
                Added = addedItems,
                Updated = updatedItems,
                Removed = removedItems,
            };

            bool IsSmallerThan(TComparison a, TComparison b)
            {
                return a.CompareTo(b) < 0;
            }

            bool AreEqual(TComparison a, TComparison b)
            {
                return a.Equals(b);
            }
        }
    }
}