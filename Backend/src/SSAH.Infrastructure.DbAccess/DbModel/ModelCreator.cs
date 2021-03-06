﻿using Microsoft.EntityFrameworkCore;

using SSAH.Infrastructure.DbAccess.TypeConfigurations;

namespace SSAH.Infrastructure.DbAccess.DbModel
{
    public class ModelCreator : IModelCreator
    {
        public void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ApplicantTypeConfiguration());
            builder.ApplyConfiguration(new CourseTypeConfiguration());
            builder.ApplyConfiguration(new GroupCourseTypeConfiguration());
            builder.ApplyConfiguration(new CourseParticipantTypeConfiguration());
            builder.ApplyConfiguration(new InstructorTypeConfiguration());
            builder.ApplyConfiguration(new NotificationEntryTypeConfiguration());
            builder.ApplyConfiguration(new ParticipantVisitedCourseDayTypeConfiguration());
            builder.ApplyConfiguration(new ParticipantTypeConfiguration());
            builder.ApplyConfiguration(new QualificationTypeConfiguration());
            builder.ApplyConfiguration(new RegistrationParticipantTypeConfiguration());
            builder.ApplyConfiguration(new RegistrationTypeConfiguration());
            builder.ApplyConfiguration(new SeasonTypeConfiguration());
        }
    }
}