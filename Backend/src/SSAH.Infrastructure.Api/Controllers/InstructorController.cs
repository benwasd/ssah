using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Services;
using SSAH.Infrastructure.Api.Dtos;

namespace SSAH.Infrastructure.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class InstructorController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICourseRepository _courseRepository;
        private readonly ISerializationService _serializerService;

        public InstructorController(IUnitOfWork unitOfWork, IMapper mapper, ICourseRepository courseRepository, ISerializationService serializerService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _courseRepository = courseRepository;
            _serializerService = serializerService;
        }

        [HttpGet]
        public async Task<CourseDto> GetMyCourse(Guid instructorId, Guid courseId)
        {
            var course = await GetCourseOfInstructor(instructorId, courseId);
            return _mapper.Map<CourseDto>(course);
        }

        [HttpGet]
        public async Task<IEnumerable<CourseDto>> GetMyCourses(Guid instructorId)
        {
            var courses = await _courseRepository.GetAllGroupCourses(instructorId, CourseStatus.Committed, DateTime.MinValue, DateTime.MaxValue);
            return courses.Select(_mapper.Map<CourseDto>);
        }

        [HttpPost]
        public async Task CloseCourse(Guid instructorId, [FromBody] CloseCourseDto closeCourseDto)
        {
            var course = await GetCourseOfInstructor(instructorId, closeCourseDto.Id);
            var courseDates = ((GroupCourse)course).GetAllCourseDates(_serializerService).ToArray();

            foreach (Participant participant in course.Participants.Select(p => p.Participant))
            {
                if (closeCourseDto.Participants.Any(pdto => pdto.Passed && pdto.Id == participant.Id))
                {
                    foreach (var courseDay in courseDates)
                    {
                        participant.VisitedCourseDays.Add(
                            new ParticipantVisitedCourseDay
                            {
                                Discipline = course.Discipline,
                                NiveauId = course.NiveauId,
                                NiveauName = "N",
                                DayStart = courseDay.Start,
                                DayDuration = courseDay.Duration
                            }
                        );
                    }
                }
            }

            course.Status = CourseStatus.Closed;

            await _unitOfWork.CommitAsync();
        }

        public async Task<Course> GetCourseOfInstructor(Guid instructorId, Guid courseId)
        {
            var course = await _courseRepository.GetByIdAsync(courseId);

            if (course.InstructorId != instructorId)
            {
                throw new InvalidOperationException();
            }

            return course;
        }
    }
}