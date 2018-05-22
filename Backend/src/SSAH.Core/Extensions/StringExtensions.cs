using System.Collections.Generic;
using System.Linq;

namespace SSAH.Core.Extensions
{
    public static class StringExtensions
    {
        /// <summary>Produces a 'gramatical sequence' eg. { "Dog", "Cat", "Tiger" } => "Dog, Cat and Tiger".</summary>
        public static string ToCommaSeparatedGrammaticalSequence(this IEnumerable<string> sequence)
        {
            var elements = sequence.Where(IsNotNullOrWhiteSpace).Distinct().ToArray();
            if (elements.Length < 1)
            {
                return string.Empty;
            }
            else if (elements.Length == 1)
            {
                return elements[0];
            }
            else
            {
                var elementsWithoutLast = elements.Take(elements.Length - 1);
                var lastElement = elements[elements.Length - 1];

                return string.Format(
                    "{0} und {1}",
                    string.Join(", ", elementsWithoutLast),
                    lastElement
                );
            }
        }

        private static bool IsNotNullOrWhiteSpace(string value)
        {
            return !string.IsNullOrWhiteSpace(value);
        }
    }
}