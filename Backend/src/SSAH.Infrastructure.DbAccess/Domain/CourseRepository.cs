﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;

namespace SSAH.Infrastructure.DbAccess.Domain
{
    public class CourseRepository : Repository<Course>, ICourseRepository
    {
        private readonly DbSet<GroupCourse> _groupCourseSet;

        public CourseRepository(DbSet<Course> set, DbSet<GroupCourse> groupCourseSet) 
            : base(set)
        {
            _groupCourseSet = groupCourseSet;
        }

        public GroupCourse GetGroupCourseOrDefault(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate, int optionsIdentifier)
        {
            return _groupCourseSet.FirstOrDefault(c => c.Discipline == discipline && c.Status == status && c.NiveauId == niveauId && c.StartDate == startDate && c.OptionsIdentifier == optionsIdentifier);
        }

        public GroupCourse GetGroupCourseLocalOrDefault(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate, int optionsIdentifier)
        {
            return _groupCourseSet.Local.FirstOrDefault(c => c.Discipline == discipline && c.Status == status && c.NiveauId == niveauId && c.StartDate == startDate && c.OptionsIdentifier == optionsIdentifier);
        }

        public GroupCourse GetBestParticipantIdMatchingGroupCourseOrDefault(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate, int optionsIdentifier, Guid[] participantIds, Guid[] excludedGroupCourseIds)
        {
            return _groupCourseSet
                .Where(c => c.Discipline == discipline && c.Status == status && c.NiveauId == niveauId && c.StartDate == startDate && c.OptionsIdentifier == optionsIdentifier)
                .Where(c => !excludedGroupCourseIds.Contains(c.Id))
                .OrderByDescending(c => c.Participants.Count(p => participantIds.Contains(p.ParticipantId)))
                .FirstOrDefault();
        }

        public GroupCourse GetGroupCourseOfRegistrationParticipantOrDefault(Guid resultingParticipantId, DateTime startDate, int optionsIdentifier)
        {
            return _groupCourseSet.FirstOrDefault(gc => gc.Participants.Any(p => p.ParticipantId == resultingParticipantId) && gc.OptionsIdentifier == optionsIdentifier && gc.StartDate == startDate);
        }

        public IEnumerable<GroupCourse> GetMatchingGroupCourses(Discipline discipline, CourseStatus status, int niveauId, DateTime startDate, int optionsIdentifier, Guid[] excludedGroupCourseIds)
        {
            return _groupCourseSet
                .Where(c => c.Discipline == discipline && c.Status == status && c.NiveauId == niveauId && c.StartDate == startDate && c.OptionsIdentifier == optionsIdentifier)
                .Where(c => !excludedGroupCourseIds.Contains(c.Id));
        }

        public IEnumerable<GroupCourse> GetAllGroupCourses(Guid instructorId, CourseStatus[] status)
        {
            return _groupCourseSet.Where(gc => gc.InstructorId == instructorId && status.Contains(gc.Status));
        }

        public async Task<IEnumerable<GroupCourse>> GetAllGroupCourses(Guid instructorId, CourseStatus status, DateTime from, DateTime to)
        {
            return await _groupCourseSet.Where(gc => gc.InstructorId == instructorId && gc.Status == status && from <= gc.StartDate && gc.StartDate <= to).ToArrayAsync();
        }

        public GroupCourse CreateAndAddGroupCourse()
        {
            var created = _groupCourseSet.CreateProxy();
            _groupCourseSet.Add(created);

            return created;
        }
    }
}