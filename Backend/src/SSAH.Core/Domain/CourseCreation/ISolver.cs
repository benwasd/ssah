namespace SSAH.Core.Domain.CourseCreation
{
    public interface ISolver
    {
        SolverResult Solve(SolverParam param);
    }
}