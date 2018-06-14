using System.Collections.Generic;

namespace SSAH.Core.Domain.CourseCreation
{
    public interface ISolver
    {
        IEnumerable<SolverResult> Solve(SolverParam param);
    }
}