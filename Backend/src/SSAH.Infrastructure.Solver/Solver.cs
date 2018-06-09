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
            int[] ageGroupOfParticipants = param.Participants.Select(p => p.AgeGroup).ToArray();
            int[] languageOfParticipants = param.Participants.Select(p => (int)p.Language).ToArray();
            int[] courseDaysInSameNiveauOfParticipants = param.Participants.Select(p => p.CoursesDaysInSameNiveau).ToArray();

            var courses = Enumerable.Range(1, param.CourseCount).ToArray();
            var participants = Enumerable.Range(0, ageGroupOfParticipants.Length).ToArray();

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
                        var ageGroup = AgeGroupStandardDeviation(courseOfParticipant, ageGroupOfParticipants, k);
                        var language = UniqueLanguages(courseOfParticipant, languageOfParticipants, k);
                        var courseDaysInSameNiveau = CourseDaysInSameNiveauStandardDeviation(courseOfParticipant, courseDaysInSameNiveauOfParticipants, k);

                        var valueForCourse = (ageGroup + 1) * language * (courseDaysInSameNiveau + 1);

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

        public static double AgeGroupStandardDeviation(int[] courseOfParticipant, int[] ageGroupOfParticipants, int courseFilter)
        {
            var ageGroups = courseOfParticipant.Zip(ageGroupOfParticipants, (course, ageGroup) => new { course, ageGroup })
                .Where(ak => ak.course == courseFilter)
                .Select(ak => ak.ageGroup)
                .ToList();

            return StandardDeviation(ageGroups, 3);
        }

        public static double UniqueLanguages(int[] courseOfParticipant, int[] languageOfParticipants, int courseFilter)
        {
            var languages = courseOfParticipant.Zip(languageOfParticipants, (course, language) => new { course, language })
                .Where(ak => ak.course == courseFilter)
                .Select(ak => ak.language)
                .ToList();

            var count = languages.Distinct().Count();

            if (count == 0)
            {
                return 99;
            }

            return count;
        }

        public static double CourseDaysInSameNiveauStandardDeviation(int[] kursOfTeilnehmer, int[] courseDaysInSameNiveauOfParticipants, int courseFilter)
        {
            var courseDaysInSameNiveaus = kursOfTeilnehmer.Zip(courseDaysInSameNiveauOfParticipants, (kurs, courseDaysInSameNiveau) => new { kurs, courseDaysInSameNiveau })
                .Where(ak => ak.kurs == courseFilter)
                .Select(ak => ak.courseDaysInSameNiveau)
                .ToList();

            return StandardDeviation(courseDaysInSameNiveaus, 3);
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