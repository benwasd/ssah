using System;
using System.Collections.Generic;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Infrastructure.DbAccess.DbModel;

namespace SSAH.Infrastructure.DbAccess.Domain.Seeder
{
    public class InstructorSeeder : IDbSeeder
    {
        private readonly IRepository<Instructor> _instructorRepository;
        private readonly IUnitOfWork _unitOfWork;

        public static readonly Guid MARTINA_ID = Guid.Parse("AEEF01D4-14DE-49D1-980A-004AF5135C30");
        public static readonly Guid JOEL_ID = Guid.Parse("AEEF01D4-14DE-49D1-980A-004AF5135C31");
        public static readonly Guid SIMON_ID = Guid.Parse("AEEF01D4-14DE-49D1-980A-004AF5135C32");

        public InstructorSeeder(IRepository<Instructor> instructorRepository, IUnitOfWork unitOfWork)
        {
            _instructorRepository = instructorRepository;
            _unitOfWork = unitOfWork;
        }

        public void Seed()
        {
            foreach (var item in Items())
            {
                var dbItem = _instructorRepository.GetByIdOrDefault(item.Id);
                if (dbItem == null)
                {
                    _instructorRepository.Add(item);
                }
                else
                {
                    dbItem.Surname = item.Surname;
                    dbItem.Givenname = item.Givenname;
                    dbItem.DateOfBirth = item.DateOfBirth;
                    dbItem.PhoneNumber = item.PhoneNumber;

                    dbItem.Qualifications.Clear();

                    foreach (Qualification qualificationItem in item.Qualifications)
                    {
                        dbItem.Qualifications.Add(qualificationItem);
                    }
                }
            }

            _unitOfWork.Commit();
        }

        public IEnumerable<Instructor> Items()
        {
            yield return new Instructor
            {
                Id = MARTINA_ID,
                Surname = "Sägesser",
                Givenname = "Martina",
                DateOfBirth = new DateTime(1987, 12, 6),
                PhoneNumber = "+41 75 412 53 75",
                Qualifications = new[]
                {
                    new Qualification { CompletionYear = 2010, Discipline = Discipline.Ski, EducationTitle = "Kids Instructor" },
                    new Qualification { CompletionYear = 2014, Discipline = Discipline.Ski, EducationTitle = "Stufe 1" }
                }
            };

            yield return new Instructor
            {
                Id = JOEL_ID,
                Surname = "Müller",
                Givenname = "Joel",
                DateOfBirth = new DateTime(1990, 2, 8),
                PhoneNumber = "+41 75 412 53 75",
                Qualifications = new[]
                {
                    new Qualification { CompletionYear = 2009, Discipline = Discipline.Snowboard, EducationTitle = "Kids Instructor" },
                    new Qualification { CompletionYear = 2012, Discipline = Discipline.Snowboard, EducationTitle = "Stufe 1" },
                    new Qualification { CompletionYear = 2015, Discipline = Discipline.Snowboard, EducationTitle = "Stufe 2" }
                }
            };

            yield return new Instructor
            {
                Id = SIMON_ID,
                Surname = "Peter",
                Givenname = "Simon",
                DateOfBirth = new DateTime(1987, 4, 7),
                PhoneNumber = "+41 75 412 53 75",
                Qualifications = new[]
                {
                    new Qualification { CompletionYear = 2008, Discipline = Discipline.Ski, EducationTitle = "Kids Instructor" }
                }
            };
        }
    }
}