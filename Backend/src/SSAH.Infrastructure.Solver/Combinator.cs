using System.Collections.Generic;
using System.Linq;

namespace SSAH.Infrastructure.Solver
{
    public static class Combinator
    {
        public static IEnumerable<ICollection<int>> PermutationsWithDublicatePatternsFiltering(ICollection<int> sequence, int count, bool root = true)
        {
            if (count == 0)
            {
                return new[] { new int[0] };
            }

            IEnumerable<ICollection<int>> permutations = Permutations(sequence, count).ToArray();
            IEnumerable<ICollection<int>> result;

            var filteringNeeded = count == 3 || count % 5 == 0 || root;
            if (filteringNeeded)
            {
                var producedPatterns = new HashSet<string>();
                result = FilterDublicatePatterns(permutations, producedPatterns);
            }
            else
            {
                result = permutations;
            }

            return result;
        }

        private static IEnumerable<ICollection<int>> Permutations(ICollection<int> sequence, int count)
        {
            foreach (var element in sequence)
            {
                foreach (var subElements in PermutationsWithDublicatePatternsFiltering(sequence, count - 1, false))
                {
                    yield return Concat(element, subElements).ToArray();
                }
            }
        }

        private static IEnumerable<ICollection<int>> FilterDublicatePatterns(IEnumerable<ICollection<int>> permutations, HashSet<string> producedPatterns)
        {
            foreach (var permutation in permutations)
            {
                var pattern = GetSequencePattern(permutation);
                var patternAlreadyProduced = producedPatterns.Add(pattern);
                if (patternAlreadyProduced)
                {
                    yield return permutation;
                }
            }
        }

        private static IEnumerable<T> Concat<T>(T a, IEnumerable<T> seqb)
        {
            yield return a;

            foreach (T b in seqb)
            {
                yield return b;
            }
        }

        // 1 2 3 = "012"
        // 1 2 1 = "010"
        // 3 2 1 = "012"
        // 1 1 2 = "001"
        // 1 2 1 2 3 = "01012"
        private static string GetSequencePattern(ICollection<int> sequence)
        {
            var known = new HashSet<int>(capacity: sequence.Count);
            var count = 0;
            var pattern = "";

            foreach (var a in sequence)
            {
                if (known.Add(a))
                {
                    pattern += count;
                    count++;
                }
                else
                {
                    var index = 0;
                    foreach (var e in known)
                    {
                        if (e == a)
                        {
                            pattern += index;
                        }

                        index++;
                    }
                }
            }

            return pattern;
        }
    }
}