using System;
using System.Diagnostics;
using System.Linq;

using NUnit.Framework;

using SSAH.Core.Domain.CourseCreation;
using SSAH.Core.Domain.Objects;

namespace SSAH.Tests.Unit.Solver
{
    [TestFixture]
    public class SolverTests
    {
        private SSAH.Infrastructure.Solver.Solver _solver;

        [SetUp]
        public void SetUp()
        {
            _solver = new SSAH.Infrastructure.Solver.Solver();
        }

        [Test]
        public void SolverSeperatesByAge()
        {
            // Arrange
            var solverParam = new SolverParam(2, new[]
            {
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000001"), 2000, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000002"), 2005, Language.English, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000003"), 1989, Language.English, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000004"), 1993, Language.English, 1)
            });

            // Act
            var result = _solver.Solve(solverParam);

            // Assert
            AssertSolverResultIsEquivalent(
                expectedComposition: new[] { new[] { 2005, 2000 }, new[] { 1993, 1989 } },
                actualResult: result,
                identifierPropertyResolver: p => p.AgeGroup
            );
        }

        [Test]
        public void SolverSeperatesHardSituation()
        {
            // Arrange
            var participants = new[]
            {
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000001"), 2014, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000002"), 1998, Language.Italian, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000003"), 1980, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000004"), 2012, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000005"), 2010, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000006"), 1990, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000007"), 2015, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000008"), 1999, Language.Italian, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000009"), 2011, Language.French, 1)
            };

            var solverParam1 = new SolverParam(1, participants);
            var solverParam2 = new SolverParam(2, participants);

            // Act
            var result1 = _solver.Solve(solverParam1);
            var result2 = _solver.Solve(solverParam2);

            // Assert
            //AssertSolverResultIsEquivalent(
            //    expectedComposition: new[] { new[] { 2005, 2000 }, new[] { 1993, 1989 } },
            //    actualResult: result,
            //    identifierPropertyResolver: p => p.AgeGroup
            //);
        }

        [Test]
        public void SolveTrickyConstellation()
        {
            // Arrange
            var solverParam = new SolverParam(2, new[]
            {
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000001"), 1960, Language.French, 5),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000002"), 1990, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000003"), 1980, Language.French, 4),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000004"), 1982, Language.English, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000005"), 2001, Language.English, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000006"), 2003, Language.English, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000007"), 2010, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000008"), 2004, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000009"), 2002, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000010"), 1998, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000011"), 1999, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000012"), 1993, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000013"), 1992, Language.SwissGerman, 0)
            });

            // Act
            var result = _solver.Solve(solverParam);

            // Assert
            var index = 1;
            foreach (var course in result.Courses)
            {
                Debug.WriteLine($"Course #{index++} with {course.Participants.Count()} participants");

                foreach (var par in course.Participants)
                {
                    Debug.WriteLine($"{par.Id} {par.AgeGroup} {par.Language} {par.CoursesDaysInSameNiveau}");
                }
            }

            Assert.Inconclusive("For playing around with the algorithm.");
        }

        private static void AssertSolverResultIsEquivalent<T>(
            int[][] expectedComposition, SolverResult actualResult, Func<SolverParticipant, T> identifierPropertyResolver)
        {
            foreach (var course in actualResult.Courses)
            {
                var aggregatedEquivalentToConstraint = expectedComposition
                    .Skip(1)
                    .Aggregate(
                        Is.EquivalentTo(expectedComposition.First()),
                        (constraint, ints) => constraint.Or.EquivalentTo(ints)
                    );

                Assert.That(course.Participants.Select(identifierPropertyResolver), aggregatedEquivalentToConstraint);
            }
        }
    }
}