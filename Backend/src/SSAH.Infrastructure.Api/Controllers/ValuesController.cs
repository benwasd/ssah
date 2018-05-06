using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.Api.Controllers
{
    public class Wus
    {
    }

    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly IUnitOfWorkFactory<IRepository<Course>, IOptions<GroupCoursesOptions>, ILogger<ValuesController>> _asd;

        public ValuesController(IUnitOfWorkFactory<IRepository<Course>, IOptions<GroupCoursesOptions>, ILogger<ValuesController>> asd)
        {
            _asd = asd;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            using (var unitOfWork = _asd.Begin())
            {
                var y = unitOfWork.Dependent.Create();
                y.Instructor = new Instructor { CreatedOn = DateTime.Now, CreatedBy = "System", Givenname = "Lol", Surname = "Lo", PhoneNumber = "+41 75 123213", DateOfBirth = DateTime.Today };
                y.CreatedOn = DateTime.Now;
                y.CreatedBy = "WUWU";
                y.Participants = new[]
                {
                    new CourseParticipant { CreatedOn = DateTime.Now, CreatedBy = "System", Participant = new Participant { CreatedOn = DateTime.Now, CreatedBy = "System", Name = "Beni", Language = Language.SwissGerman} },
                    new CourseParticipant { CreatedOn = DateTime.Now, CreatedBy = "System", Participant = new Participant { CreatedOn = DateTime.Now, CreatedBy = "System", Name = "Andrina", Language = Language.SwissGerman } }
                };
                y.PeriodOptionsValue = "";

                unitOfWork.Dependent3.LogTrace("WUSA");

                unitOfWork.Dependent.Add(y);
                unitOfWork.Commit();
            }

            using (var u = _asd.Begin())
            {
                var x = u.Dependent.Get().ToList();
                return x.First().Participants.Select(p => p.Participant.Name).ToArray();
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