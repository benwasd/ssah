using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;

using Autofac;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Messages;
using SSAH.Core.Extensions;
using SSAH.Core.Messaging;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.CourseCreation
{
    public class NewCourseNotifyInstructor : AutoAttachMessageObserverBase
    {
        protected override IEnumerable<IDisposable> SetupCore(IQueue queue, IContainer rootContainer)
        {
            yield return queue
                .OfType<CommittedCourseCreatedMessage>()
                .Where(m => m.InstructorId.HasValue)
                .SubscribeInUnitOfWorkScope<CommittedCourseCreatedMessage, Handler>(rootContainer);
        }

        public class Handler : ObserverBase<CommittedCourseCreatedMessage>
        {
            private readonly IRepository<Instructor> _instructorRepository;
            private readonly ICourseRepository _courseRepository;
            private readonly INotificationService _notificationService;
            private readonly IOptionsMonitor<EnvironmentOptions> _environmentOptions;

            public Handler(IRepository<Instructor> instructorRepository, ICourseRepository courseRepository, INotificationService notificationService, IOptionsMonitor<EnvironmentOptions> environmentOptions)
            {
                _instructorRepository = instructorRepository;
                _courseRepository = courseRepository;
                _notificationService = notificationService;
                _environmentOptions = environmentOptions;
            }

            protected override void OnNextCore(CommittedCourseCreatedMessage message)
            {
                var instructor = _instructorRepository.GetById(message.InstructorId.Value);
                var course = _courseRepository.GetById(message.CourseId);

                var visibleFrom = DateTime.Now.Date.AddDays(-7);
                var visibleTo = DateTime.Now.Date.AddDays(14);

                IEnumerable<string> messageLines = new[] { $"Hallo {instructor.Givenname}" };

                if (visibleFrom <= course.StartDate && course.StartDate <= visibleTo)
                {
                    messageLines = messageLines.Concat(new[]
                    {
                        $"Du wurdest in der Woche {course.StartDate:dd. MMMM yyyy} für einen Kurs eingeteilt. Schaue bei Gelegenheit vorbei:",
                        string.Format(_environmentOptions.Current().InstructorCourseDetailFrontendUrl, course.Id)
                    });
                }
                else
                {
                    messageLines = messageLines.Concat(new[]
                    {
                        $"Du wurdest in der Woche {course.StartDate:dd. MMMM yyyy} für einen Kurs eingeteilt. Der Kurs kann noch ändern. Details sind 14 Tage vor dem Kursbeginn in der Leiterapp aufrufbar."
                    });
                }

                _notificationService.SendNotification(
                    instructor.PhoneNumber,
                    Constants.NotificationIds.INSTRUCTOR_COURSE_CREATED,
                    new[] { course.Id.ToString() },
                    string.Join(Environment.NewLine, messageLines)
                ).Wait();
            }

            protected override void OnErrorCore(Exception error)
            {
            }

            protected override void OnCompletedCore()
            {
            }
        }
    }
}