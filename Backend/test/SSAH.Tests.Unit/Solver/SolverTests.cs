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
                actualResult: result.First(),
                identifierPropertyResolver: p => p.AgeGroup
            );
        }

        [Test]
        public void CourseSizeMultiplierCanDecideWhichSolutionToChoose_HardCaseSingleParticipantCourse()
        {
            // Arrange
            var participants = new[]
            {
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000001"), 2014, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000002"), 2015, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000003"), 2013, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000004"), 2001, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000005"), 1999, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000006"), 2000, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000007"), 2002, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000008"), 1998, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000009"), 2009, Language.Italian, 3)
            };

            var solverParam1 = new SolverParam(1, participants);
            var solverParam2 = new SolverParam(2, participants);
            var solverParam3 = new SolverParam(3, participants);

            // Act
            var result1 = _solver.Solve(solverParam1);
            var result2 = _solver.Solve(solverParam2);
            var result3 = _solver.Solve(solverParam3);
            var results = result1.Concat(result2).Concat(result3).OrderBy(r => r.Score * r.CourseSizeMultiplier).ToArray();

            // Assert
            AssertSolverResultIsEquivalent(
                expectedComposition: new[] { new[] { 2013, 2014, 2015 }, new[] { 1998, 1999, 2000, 2001, 2002 }, new[] { 2009 } },
                actualResult: results.First(),
                identifierPropertyResolver: p => p.AgeGroup
            );

            AssertSolverResultIsEquivalent(
                expectedComposition: new[] { new[] { 2013, 2014, 2015, 2009 }, new[] { 1998, 1999, 2000, 2001, 2002 } },
                actualResult: results.Skip(1).First(),
                identifierPropertyResolver: p => p.AgeGroup
            );
        }

        [Test]
        public void CourseSizeMultiplierCanDecideWhichSolutionToChoose_HardCaseAllParticipantsDifferent()
        {
            // Arrange
            var participants = new[]
            {
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000001"), 1980, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000002"), 1972, Language.Italian, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000003"), 1984, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000004"), 2011, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000005"), 2017, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000006"), 2004, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000007"), 1998, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000008"), 2014, Language.Italian, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000009"), 2010, Language.French, 1)
            };
            
            var solverParam1 = new SolverParam(1, participants);
            var solverParam2 = new SolverParam(2, participants);
            var solverParam3 = new SolverParam(3, participants);

            // Act
            var result1 = _solver.Solve(solverParam1);
            var result2 = _solver.Solve(solverParam2);
            var result3 = _solver.Solve(solverParam3);
            var results = result1.Concat(result2).Concat(result3).OrderBy(r => r.Score * r.CourseSizeMultiplier).ToArray();

            // Assert
            AssertSolverResultIsEquivalent(
                expectedComposition: new[] { new[] { 1, 2, 3 }, new[] { 4, 5, 6, 7, 8, 9 } },
                actualResult: results.First(),
                identifierPropertyResolver: p => int.Parse(p.Id.ToString().Substring(34))
            );
        }
        
        [Test]
        public void CourseSizeMultiplierCanDecideWhichSolutionToChoose_RealwordCase()
        {
            // Arrange
            var participants = new[]
            {
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000001"), 2014, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000002"), 2014, Language.Italian, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000003"), 2014, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000004"), 2014, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000005"), 2015, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000006"), 2015, Language.SwissGerman, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000007"), 2016, Language.French, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000008"), 2014, Language.Italian, 0),
                new SolverParticipant(new Guid("00000000-0000-0000-0000-000000000009"), 2016, Language.French, 1)
            };

            var solverParam1 = new SolverParam(1, participants);
            var solverParam2 = new SolverParam(2, participants);
            var solverParam3 = new SolverParam(3, participants);

            // Act
            var result1 = _solver.Solve(solverParam1);
            var result2 = _solver.Solve(solverParam2);
            var result3 = _solver.Solve(solverParam3);
            var results = result1.Concat(result2).Concat(result3).OrderBy(r => r.Score * r.CourseSizeMultiplier).ToArray();

            // Assert
            AssertSolverResultIsEquivalent(
                expectedComposition: new[] { new[] { 1, 4, 7, 9 }, new[] { 2, 3, 5, 6, 8 } },
                actualResult: results.First(),
                identifierPropertyResolver: p => int.Parse(p.Id.ToString().Substring(34))
            );
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
            foreach (var course in result.First().Courses)
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