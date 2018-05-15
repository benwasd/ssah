using System;
using System.Collections.Generic;
using System.Linq;

using SSAH.Core.Domain.CourseCreation;

namespace SSAH.Infrastructure.Solver
{
    public static class CourseCreationService
    {
        public static void Main()
        {
            // readonly
            int[] jahrgangOfTeilnehmer = { 1900, 1989, 2002, 2000 };
            int[] spracheOfTeilnehmer = { 1, 1, 2, 2 };
            int[] besuchteKurstageAufGleichemNiveauOfTeilnehmer = { 3, 4, 1, 1 };

            var teilnehmers = Enumerable.Range(0, jahrgangOfTeilnehmer.Length).ToArray(); // 0-3
            var kurse = Enumerable.Range(1, 3).ToArray(); // 1-3

            // mutated
            int[] kursOfTeilnehmer; // { 1, 1, 1, 1 };

            // solve
            var solutions = new List<Tuple<int[], double>>();
            foreach (var x in GetPermutations(kurse, teilnehmers.Length))
            {
                kursOfTeilnehmer = x.ToArray();

                var value = kurse
                    .Select(k => {
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

            Console.ReadLine();
        }

        public static IEnumerable<IEnumerable<T>> GetPermutations<T>(ICollection<T> list, int length)
        {
            if (length == 1)
            {
                return list.Select(t => new[] { t });
            }

            return GetPermutations(list, length - 1)
                .SelectMany(t => list.Where(e => true), (t1, t2) => t1.Concat(new T[] { t2 }));
        }

        public static double StandartabweichungJahrgaenge(int[] kursOfTeilnehmer, int[] jahrgangOfTeilnehmer, int kursFilter)
        {
            var jahrgaenge = kursOfTeilnehmer.Zip(jahrgangOfTeilnehmer, (kurs, jahrgang) => new { kurs, jahrgang })
                .Where(ak => ak.kurs == kursFilter)
                .Select(ak => ak.jahrgang)
                .ToList();

            return Standardabweichung(jahrgaenge, 3) + 1;
        }

        public static double EindeutigeSprachen(int[] kursOfTeilnehmer, int[] spracheOfTeilnehmer, int kursFilter)
        {
            var sprachen = kursOfTeilnehmer.Zip(spracheOfTeilnehmer, (kurs, sprache) => new { kurs, sprache })
                .Where(ak => ak.kurs == kursFilter)
                .Select(ak => ak.sprache)
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

        public static void ForEach(this int[] array, Action<int, int> each)
        {
            int index = 0;
            foreach (var item in array)
            {
                each(index, item);
                index++;
            }
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