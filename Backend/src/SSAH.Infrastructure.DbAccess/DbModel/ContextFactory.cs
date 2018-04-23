using Microsoft.EntityFrameworkCore;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public class ContextFactory : IContextFactory
    {
        private readonly IModelFactory _modelFactory;
        private static bool s_isRecreated = false;

        public ContextFactory(IModelFactory modelFactory)
        {
            _modelFactory = modelFactory;
        }

        public Context Create()
        {
            var options = BuildDbContextOptions();

            var c = new Context(options);

            // TODO: Find a better place, replace with migrations
            //lock (this)
            //{
            //    if (!s_isRecreated)
            //    {
            //        c.Database.EnsureDeleted();
            //        c.Database.EnsureCreated();
            //        s_isRecreated = true;
            //    }
            //}

            return c;
        }

        private DbContextOptions<Context> BuildDbContextOptions()
        {
            var builder = new DbContextOptionsBuilder<Context>();
            builder.UseSqlServer(@"Server=.\SQLEXPRESS; Database=SSAH; Integrated Security=True;");
            builder.UseLazyLoadingProxies();

            builder.UseModel(_modelFactory.Create());

            return builder.Options;
        }
    }
}