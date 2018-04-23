using System;
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
                var y = unitOfWork.Dependent.Create();
                y.Lol = "wuasud";
                y.CreatedOn = DateTimeOffset.Now;
                y.CreatedBy = "WUWU";
                y.Participants = new[]
                {
                    new Participant { CreatedOn = DateTimeOffset.Now, CreatedBy = "System", Name = "Beni" },
                    new Participant { CreatedOn = DateTimeOffset.Now, CreatedBy = "System", Name = "Andrina" }
                };


                unitOfWork.Dependent.Add(y);
                unitOfWork.Commit();
            }

            using (var u = unitOfWorkFactory.Begin())
            {
                var x = u.Dependent.Get().ToList();
                return x.First().Participants.Select(p => p.Name).ToArray();
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
