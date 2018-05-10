using System;
using System.Collections.Generic;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Infrastructure.DbAccess.DbModel;

namespace SSAH.Infrastructure.DbAccess.Domain.Seeder
{
    public class SeasonSeeder : IDbSeeder
    {
        private readonly ISeasonRepository _seasonRepository;
        private readonly IUnitOfWork _unitOfWork;

        public static readonly Guid WINTER_ID = Guid.Parse("AEEF01D4-14DE-49D1-980A-004AF5135C30");
        public static readonly Guid SOMMER_ID = Guid.Parse("AEEF01D4-14DE-49D1-980A-004AF5135C31");

        public SeasonSeeder(ISeasonRepository seasonRepository, IUnitOfWork unitOfWork)
        {
            _seasonRepository = seasonRepository;
            _unitOfWork = unitOfWork;
        }

        public void Seed()
        {
            foreach (var item in Items())
            {
                var dbItem = _seasonRepository.GetByIdOrDefault(item.Id);
                if (dbItem == null)
                {
                    _seasonRepository.Add(item);
                }
                else
                {
                    dbItem.Label = item.Label;
                    dbItem.Start = item.Start;
                    dbItem.End = item.End;
                }
            }

            _unitOfWork.Commit();
        }

        public IEnumerable<Season> Items()
        {
            yield return new Season { Id = WINTER_ID, Label = "Winter 2017/2018", Start = new DateTime(2017, 12, 6), End = new DateTime(2018, 4, 8) };
            yield return new Season { Id = SOMMER_ID, Label = "Sommer 2017/2018", Start = new DateTime(2018, 5, 1), End = new DateTime(2018, 9, 10) };
        }
    }
}