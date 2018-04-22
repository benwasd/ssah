using System.Collections.Generic;
using System.Linq;

using Autofac;

using Microsoft.AspNetCore.Mvc;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;

namespace SSAH.Infrastructure.Api.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var unitOfWorkFactory = DependencyRegistry.Container.Resolve<IUnitOfWorkFactory<IRepository<Course>>>();

            using (var unitOfWork = unitOfWorkFactory.Begin())
            {
                return unitOfWork.Dependent.Get().Select(x => x.Id.ToString()).ToArray();
            }            
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
