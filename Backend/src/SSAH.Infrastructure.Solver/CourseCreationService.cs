using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Linq;

namespace SSAH.Infrastructure.Solver
{
    public static class CourseCreationService
    {
        public static void Main()
        {
            // readonly
            int[] jahrgangOfTeilnehmer = { 1960, 1990, 1980, 1982, 2001, 2003, 2010, 2004, 2002, 1998, 1999, 1993, 1992, 1991, 1989, 1993/*, 1950*/ };
            int[] spracheOfTeilnehmer = { 1, 1, 2, 2, 2, 3, 3, 2, 1, 2, 1, 1, 4, 4, 3/*, 2, 2*/ };
            int[] besuchteKurstageAufGleichemNiveauOfTeilnehmer = { 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 1, 1, 1/*, 1, 5*/ };

            var teilnehmers = Enumerable.Range(0, jahrgangOfTeilnehmer.Length).ToArray(); // 0-3
            var kurse = Enumerable.Range(1, 3).ToArray(); // 1-3

            // mutated
            int[] kursOfTeilnehmer; // { 1, 1, 1, 1 };

            //Debug.WriteLine("www1 {0}", (object)PatternStamp(new[] { 1, 1 }));
            //Debug.WriteLine("www1 {0}", (object)PatternStamp(new[] { 3, 4 }));
            //Debug.WriteLine("www1 {0}", (object)PatternStamp(new[] { 0, 1, 0, 4 }));
            //Debug.WriteLine("www1 {0}", (object)PatternStamp(new[] { 0, 1, 0, 2 }));
            //Debug.WriteLine("www1 {0}", (object)PatternStamp(new[] { 2, 1, 2, 1, 2 }));
            //Debug.WriteLine("www2 {0}", (object)PatternStamp(new[] { 1, 2, 1, 2, 4 }));
            //Debug.WriteLine("www3 {0}", (object)PatternStamp(new[] { 1, 2, 1, 2, 4 }));
            //Debug.WriteLine("www4 {0}", (object)PatternStamp(new[] { 2, 1, 2, 1, 8 }));

            // solve
            var solutions = new List<Tuple<int[], double>>();

            /*

                    13:
                    Permutationen Start 16.05.2018 11:39:46
                    Permutationen 265721
                    Permutationen End 16.05.2018 11:52:04
                    ~13 min

                    13:
                    Kombs Start 16.05.2018 11:52:04
                    Kombs 265721
                    Kombs End 16.05.2018 11:58:21
                    ~6 min

                    13 Permutation Util:
                    Permutationen Start 16.05.2018 13:03:08
                    Permutationen 265722
                    Permutationen End 16.05.2018 13:08:09
                    ~5 min

                    Permutationen Start 16.05.2018 14:24:09
                    Permutationen 265721
                    Permutationen End 16.05.2018 14:24:15
                    ~6 sec

                    15:
                    Permutationen Start 16.05.2018 14:28:33
                    Permutationen 2391485
                    Permutationen End 16.05.2018 14:29:38
                    ~1 min

                    16: 
                    Permutationen Start 16.05.2018 14:46:45
                    Permutationen 7174454
                    Permutationen End 16.05.2018 14:49:26
                    ~2.5 min

                    17:
                    Permutationen Start 16.05.2018 14:50:47
                    Permutationen 21523361
                    Permutationen End 16.05.2018 14:59:04
                    ~9min

             */

            Debug.WriteLine("Permutationen Start {0}", DateTime.Now);
            var pers = Combinator.PermutationsWithDublicatePatternsFiltering(kurse, teilnehmers.Length).Count();
            Debug.WriteLine("Permutationen {0}", pers);
            Debug.WriteLine("Permutationen End {0}", DateTime.Now);

            //Debug.WriteLine("Permutationen Start {0}", DateTime.Now);
            //var pers2 = GetPermutationsYield2(kurse, teilnehmers.Length).Count();
            //Debug.WriteLine("Permutationen {0}", pers2);
            //Debug.WriteLine("Permutationen End {0}", DateTime.Now);

            //Debug.WriteLine("Kombs Start {0}", DateTime.Now);
            //var combs = GetKCombsWithRept(kurse, teilnehmers.Length).Distinct(new X()).Count();
            //Debug.WriteLine("Kombs {0}", combs);
            //Debug.WriteLine("Kombs End {0}", DateTime.Now);

            foreach (var x in Combinator.PermutationsWithDublicatePatternsFiltering(kurse, teilnehmers.Length))
            {
                kursOfTeilnehmer = x.ToArray();

                var value = kurse
                    .Select(k =>
                    {
                        var jahrgang = StandartabweichungJahrgaenge(kursOfTeilnehmer, jahrgangOfTeilnehmer, k);
                        var sprache = EindeutigeSprachen(kursOfTeilnehmer, spracheOfTeilnehmer, k);
                        var besuchteKurstageAufGleichemNiveau = StandartabweichungBesuchteKurstageAufGleichemNiveau(kursOfTeilnehmer, besuchteKurstageAufGleichemNiveauOfTeilnehmer, k);

                        var valueForCourse = jahrgang * sprache * besuchteKurstageAufGleichemNiveau;

                        return valueForCourse;
                    })
                    .Sum();

                solutions.Add(Tuple.Create(kursOfTeilnehmer, value));
            }

            var bestSolutions = solutions.OrderBy(s => s.Item2).Take(10).ToArray();

        }

        /*
        public static IEnumerable<IEnumerable<T>> GetPermutations<T>(ICollection<T> list, int length)
        {
            if (length == 1)
            {
                return list.Select(t => new[] { t });
            }

            return GetPermutations(list, length - 1)
                .SelectMany(t => list.Select(t2 => t.Concat(new T[] { t2 })));
        }

        public static IEnumerable<ICollection<int>> GetPermutationsYield(ICollection<int> list, int count)
        {
            if (count == 0)
            {
                yield return new int[0];
            }
            else
            {
                foreach (var element in list)
                {
                    foreach (var subElements in GetPermutationsYield(list, count - 1))
                    {
                        yield return Concat(element, subElements).ToArray();
                    }
                }
            }
        }
        */

        public static IEnumerable<ICollection<int>> GetPermutationsYield2(ICollection<int> list, int count, bool root = true)
        {
            if (count == 0)
            {
                yield return Array.Empty<int>();
            }
            else
            {
                HashSet<string> producedPatterns = null;

                if (count % 3 == 0 || root)
                {
                    producedPatterns = new HashSet<string>();
                }

                foreach (var element in list)
                {
                    foreach (var subElements in GetPermutationsYield2(list, count - 1, root: false))
                    {
                        var x = Concat(element, subElements).ToArray();

                        if (producedPatterns != null)
                        {
                            var pattern = PatternStamp(x);
                            if (producedPatterns.Add(pattern))
                            {
                                yield return x;
                            }
                        }
                        else
                        {
                            yield return x;
                        }
                    }
                }
            }
        }

        public static IEnumerable<T> Concat<T>(T a, IEnumerable<T> seqb)
        {
            yield return a;

            foreach (T b in seqb)
            {
                yield return b;
            }
        }

        /*

        public class X : EqualityComparer<Col>
        {
            public override bool Equals(Col x, Col y)
            {
                return x.Changes == y.Changes;
            }

            public override int GetHashCode(Col obj)
            {
                return obj.Changes.GetHashCode();
            }

            // 2 2, 3 3 == true
            // 1 2, 3 2 == true
            // 1 2, 1 1 == false
            // 1 2 3, 3 2 1 == true
            // 1 2 1, 3 2 1 == false
            public static bool IsSameCombination(IEnumerable<int> seqa, IEnumerable<int> seqb)
            {
                int? alast = null;
                int? blast = null;

                Dictionary<int, int> equalities = new Dictionary<int, int>();

                foreach (var zip in seqa.Zip(seqb, (a, b) => new { a, b }))
                {
                    var achange = alast != zip.a;
                    var bchange = blast != zip.b;

                    if (achange != bchange)
                    {
                        return false;
                    }

                    equalities[alast.GetValueOrDefault(-1)] = blast.GetValueOrDefault(-1);

                    var aisknown = equalities.ContainsKey(zip.a);
                    var bisknown = equalities.ContainsValue(zip.b);

                    if (aisknown != bisknown)
                    {
                        return false;
                    }

                    if (aisknown)
                    {
                        if (equalities[zip.a] != zip.b)
                        {
                            return false;
                        }
                    }

                    alast = zip.a;
                    blast = zip.b;
                }

                return true;
            }

        }

        */

        // 1 2 3 = "012"
        // 1 2 1 = "010"
        // 3 2 1 = "012"
        // 1 1 2 = "001"
        // 1 2 1 2 3 = "01012"
        public static string PatternStamp(int[] seq)
        {
            HashSet<int> known = new HashSet<int>(capacity: seq.Length);
            int cnt = 0;

            string res = "";

            foreach (var a in seq)
            {
                if (known.Add(a))
                {
                    res += cnt;
                    cnt++;
                }
                else
                {
                    int index = 0;

                    foreach (var kw in known)
                    {
                        if (kw == a)
                        {
                            res += index;
                        }

                        index++;
                    }
                }
            }

            return res;
        }

        public static double StandartabweichungJahrgaenge(int[] kursOfTeilnehmer, int[] jahrgangOfTeilnehmer, int kursFilter)
        {
            var jahrgaenge = kursOfTeilnehmer.Zip(jahrgangOfTeilnehmer, (kurs, jahrgang) => new { kurs, year = jahrgang })
                .Where(ak => ak.kurs == kursFilter)
                .Select(ak => ak.year)
                .ToList();

            return Standardabweichung(jahrgaenge, 3) + 1;
        }

        public static double EindeutigeSprachen(int[] kursOfTeilnehmer, int[] spracheOfTeilnehmer, int kursFilter)
        {
            var sprachen = kursOfTeilnehmer.Zip(spracheOfTeilnehmer, (kurs, sprache) => new { kurs, language = sprache })
                .Where(ak => ak.kurs == kursFilter)
                .Select(ak => ak.language)
                .ToList();

            var count = sprachen.Distinct().Count();

            if (count == 0)
            {
                return 99;
            }

            return count;
        }

        public static double StandartabweichungBesuchteKurstageAufGleichemNiveau(int[] kursOfTeilnehmer, int[] besuchteKurstageAufGleichemNiveauOfTeilnehmer, int kursFilter)
        {
            var besuchteKurstageAufGleichemNiveau = kursOfTeilnehmer.Zip(besuchteKurstageAufGleichemNiveauOfTeilnehmer, (kurs, kurstage) => new { kurs, kurstage })
                .Where(ak => ak.kurs == kursFilter)
                .Select(ak => ak.kurstage)
                .ToList();

            return Standardabweichung(besuchteKurstageAufGleichemNiveau, 3) + 1;
        }

        public static double Standardabweichung(List<int> Liste, int Kommastellen)
        {
            if (Liste.Count == 0)
            {
                return 99;
            }

            if (Liste.Count == 1)
            {
                return 0;
            }

            double Summe_aller_Quadrierungen = 0;
            double Mittelwert = Liste.Average();

            foreach (double Wert in Liste)
            {
                Summe_aller_Quadrierungen += Math.Pow((Wert - Mittelwert), 2);
            }

            return Math.Round(Math.Sqrt(Summe_aller_Quadrierungen / (Liste.Count)), Kommastellen);
        }
    }
}