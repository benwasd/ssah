using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;

using SSAH.Core;
using SSAH.Core.Domain;
using SSAH.Core.Domain.Objects;
using SSAH.Infrastructure.Api.Dtos;

namespace SSAH.Infrastructure.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class InstructorController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICourseRepository _courseRepository;

        public InstructorController(IUnitOfWork unitOfWork, IMapper mapper, ICourseRepository courseRepository)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _courseRepository = courseRepository;
        }

        [HttpGet]
        public async Task<CourseDto> GetMyCourse(Guid instructorId, Guid courseId)
        {
            var registration = await _courseRepository.GetByIdAsync(courseId);

            if (registration.InstructorId != instructorId)
            {
                throw new InvalidOperationException();
            }

            return _mapper.Map<CourseDto>(registration);
        }

        [HttpGet]
        public async Task<IEnumerable<CourseDto>> GetMyCourses(Guid instructorId)
        {
            var courses = await _courseRepository.GetAllGroupCourses(instructorId, CourseStatus.Committed, DateTime.MinValue, DateTime.MaxValue);
            return courses.Select(_mapper.Map<CourseDto>);
        }

        public Task CloseCourse(Guid instructorId, [FromBody] CloseCourseDto closeCourseDto)
        {

            return null;
        }
    }
}