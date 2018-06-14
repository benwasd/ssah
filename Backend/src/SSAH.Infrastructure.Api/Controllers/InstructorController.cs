using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

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
        private readonly ICourseRepository _courseRepository;
        private readonly ISerializationService _serializerService;
        private readonly IOptions<NiveauOptionsCollection> _niveauOptionsCollection;
        private readonly IMapper _mapper;

        public InstructorController(IUnitOfWork unitOfWork, ICourseRepository courseRepository, ISerializationService serializerService, IOptions<NiveauOptionsCollection> niveauOptionsCollection, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _courseRepository = courseRepository;
            _serializerService = serializerService;
            _niveauOptionsCollection = niveauOptionsCollection;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<CourseDto> GetMyCourse(Guid instructorId, Guid courseId)
        {
            var course = await GetCourseOfInstructor(instructorId, courseId);
            return _mapper.Map<CourseDto>(course);
        }

        [HttpGet]
        public async Task<IEnumerable<CourseDto>> GetMyCourses(Guid instructorId, DateTime from, DateTime to)
        {
            var courses = await _courseRepository.GetAllGroupCourses(instructorId, CourseStatus.Committed, from, to);
            return courses.Select(_mapper.Map<CourseDto>);
        }

        [HttpPost]
        public async Task CloseCourse(Guid instructorId, [FromBody] CloseCourseDto closeCourseDto)
        {
            var passedPartipiantIds = closeCourseDto.Participants.Where(x => x.Passed).Select(x => x.Id).ToArray();

            var course = await GetCourseOfInstructor(instructorId, closeCourseDto.Id);
            course.Close(passedPartipiantIds, _niveauOptionsCollection.Value, _serializerService);

            await _unitOfWork.CommitAsync();
        }

        private async Task<Course> GetCourseOfInstructor(Guid instructorId, Guid courseId)
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