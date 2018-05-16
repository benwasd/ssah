using System;
using System.Collections.Generic;
using System.Linq;

using SSAH.Core.Domain.CourseCreation;

namespace SSAH.Infrastructure.Solver
{
    public class Solver : ISolver
    {
        public SolverResult Solve(SolverParam param)
        {
            // readonly
            int[] yearOfParticipants = param.Participants.Select(p => p.Year).ToArray();
            int[] languageOfParticipants = param.Participants.Select(p => (int)p.Language).ToArray();
            int[] coursesCountInSameNiveauOfParticipants = param.Participants.Select(p => p.CoursesCountInSameNiveau).ToArray();

            var courses = Enumerable.Range(1, param.CourseCount).ToArray();
            var participants = Enumerable.Range(0, yearOfParticipants.Length).ToArray();

            // mutated
            int[] courseOfParticipant;

            // solve
            var solutions = new List<Tuple<int[], double>>();

            foreach (var permutation in Combinator.PermutationsWithDublicatePatternsFiltering(courses, participants.Length))
            {
                courseOfParticipant = permutation.ToArray();

                var value = courses
                    .Select(k =>
                    {
                        var year = YearStandardDeviation(courseOfParticipant, yearOfParticipants, k);
                        var language = UniqueLanguages(courseOfParticipant, languageOfParticipants, k);
                        var coursesCountInSameNiveau = CoursesCountInSameNiveauStandardDeviation(courseOfParticipant, coursesCountInSameNiveauOfParticipants, k);

                        var valueForCourse = year * language * coursesCountInSameNiveau;

                        return valueForCourse;
                    })
                    .Sum();

                solutions.Add(Tuple.Create(courseOfParticipant, value));
            }

            var bestSolutions = solutions.OrderBy(s => s.Item2).Take(10).ToArray();

            // map results
            var x = bestSolutions.First();
            var y = x.Item1
                .Select((courseIndex, participantIndex) => new { courseIndex, participantIndex })
                .GroupBy(cp => cp.courseIndex)
                .Select(g => new SolverCourseResult(g.Select(i => param.Participants.ElementAt(i.participantIndex)).ToArray()))
                .ToList();

            return new SolverResult(x.Item2, y);
        }

        public static double YearStandardDeviation(int[] courseOfParticipant, int[] yearOfParticipants, int courseFilter)
        {
            var jahrgaenge = courseOfParticipant.Zip(yearOfParticipants, (course, year) => new { course, year })
                .Where(ak => ak.course == courseFilter)
                .Select(ak => ak.year)
                .ToList();

            return StandardDeviation(jahrgaenge, 3) + 1;
        }

        public static double UniqueLanguages(int[] courseOfParticipant, int[] languageOfParticipants, int courseFilter)
        {
            var sprachen = courseOfParticipant.Zip(languageOfParticipants, (course, language) => new { course, language })
                .Where(ak => ak.course == courseFilter)
                .Select(ak => ak.language)
                .ToList();

            var count = sprachen.Distinct().Count();

            if (count == 0)
            {
                return 99;
            }

            return count;
        }

        public static double CoursesCountInSameNiveauStandardDeviation(int[] kursOfTeilnehmer, int[] coursesCountInSameNiveauOfParticipants, int courseFilter)
        {
            var besuchteKurstageAufGleichemNiveau = kursOfTeilnehmer.Zip(coursesCountInSameNiveauOfParticipants, (kurs, coursesCountInSameNiveau) => new { kurs, coursesCountInSameNiveau })
                .Where(ak => ak.kurs == courseFilter)
                .Select(ak => ak.coursesCountInSameNiveau)
                .ToList();

            return StandardDeviation(besuchteKurstageAufGleichemNiveau, 3) + 1;
        }

        public static double StandardDeviation(ICollection<int> sequence, int digits)
        {
            if (sequence.Count == 0)
            {
                return 99;
            }

            if (sequence.Count == 1)
            {
                return 0;
            }

            double sum = 0;
            double average = sequence.Average();

            foreach (double element in sequence)
            {
                sum += Math.Pow((element - average), 2);
            }

            return Math.Round(Math.Sqrt(sum / (sequence.Count)), digits);
        }
    }
}