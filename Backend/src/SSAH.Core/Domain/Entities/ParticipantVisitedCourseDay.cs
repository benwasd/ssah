﻿using System;
using System.ComponentModel.DataAnnotations;

using SSAH.Core.Domain.Objects;

namespace SSAH.Core.Domain.Entities
{
    public class ParticipantVisitedCourseDay : EntityBase
    {
        public Guid ParticipantId { get; set; }

        public Discipline Discipline { get; set; }

        public int NiveauId { get; set; }

        [StringLength(Constants.StringLengths.NAME)]
        public string NiveauName { get; set; }

        public DateTime DayStart { get; set; }

        public TimeSpan DayDuration { get; set; }

        public DateTime DayEnd => DayStart + DayDuration;

        public Period DayPeriod => new Period(DayStart, DayDuration);
    }
}