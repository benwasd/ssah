﻿using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Extensions;

namespace SSAH.Core.Services
{
    public class CourseService : ICourseService
    {
        private readonly ISeasonRepository _seasonRepository;
        private readonly IOptions<GroupCourseOptionsCollection> _groupCourseOptions;
        private readonly ISerializationService _serializationService;

        public CourseService(ISeasonRepository seasonRepository, IOptions<GroupCourseOptionsCollection> groupCourseOptions, ISerializationService serializationService)
        {
            _seasonRepository = seasonRepository;
            _groupCourseOptions = groupCourseOptions;
            _serializationService = serializationService;
        }

        public IEnumerable<Course> GetPotentialGroupCourses(Discipline discipline, DateTime from, DateTime to)
        {
            var matchingGroupCourseOptions = _groupCourseOptions.Value.Where(gc => gc.Discipline == discipline && gc.ValidFrom <= from && to <= gc.ValidTo);
            var currentOrUpcommingSeasonStart = _seasonRepository.GetCurrentOrUpcommingOrThrow(DateTime.Today).Start;

            foreach (var groupCourseOption in matchingGroupCourseOptions)
            {
                var courseStart = CalculateFirstCourseStartLappingInPeriod(currentOrUpcommingSeasonStart, from, groupCourseOption);

                while (courseStart < to)
                {
                    yield return CreateEarlyProposalCourse(courseStart, groupCourseOption);

                    courseStart = courseStart.AddDays(groupCourseOption.WeekInterval * 7);
                }
            }
        }

        private DateTime CalculateFirstCourseStartLappingInPeriod(DateTime currentOrUpcommingSeasonStart, DateTime from, GroupCourseOptions groupCourseOption)
        {
            var weeksSinceSeasonStart = DateTimeExtensions.WeekDiff(currentOrUpcommingSeasonStart, from);
            var offset = (int)Math.Ceiling((double)weeksSinceSeasonStart / groupCourseOption.WeekInterval);

            return currentOrUpcommingSeasonStart.AddDays(offset * 7);
        }

        private Course CreateEarlyProposalCourse(DateTime courseStart, GroupCourseOptions groupCourseOption)
        {
            return new Course(groupCourseOption.Discipline, CourseStatus.EarlyProposal, CourseType.Group, courseStart)
                .SetPeriodsOptions(_serializationService, groupCourseOption.Periods);
        }
    }
}