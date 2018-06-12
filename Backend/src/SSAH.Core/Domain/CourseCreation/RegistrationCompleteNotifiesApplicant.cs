using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;

using Autofac;

using Microsoft.Extensions.Options;

using SSAH.Core.Domain.Messages;
using SSAH.Core.Extensions;
using SSAH.Core.Messaging;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.CourseCreation
{
    public class RegistrationCompleteNotifiesApplicant : AutoAttachMessageObserverBase
    {
        protected override IEnumerable<IDisposable> SetupCore(IQueue queue, IContainer rootContainer)
        {
            yield return queue
                .OfType<ParticipantRegistredMessage>()
                .GroupByUntil(r => r.RegistrationId, durationSelector: r => Observable.Timer(TimeSpan.FromMinutes(0.5)))
                .Subscribe(r => r.ToList().LastAsync().SubscribeInUnitOfWorkScope<IList<ParticipantRegistredMessage>, Handler>(rootContainer));
        }

        public class Handler : ObserverBase<IList<ParticipantRegistredMessage>>
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IRegistrationRepository _registrationRepository;
            private readonly INotificationService _notificationService;
            private readonly IOptionsMonitor<EnvironmentOptions> _environmentOptions;

            public Handler(IUnitOfWork unitOfWork, IRegistrationRepository registrationRepository, INotificationService notificationService, IOptionsMonitor<EnvironmentOptions> environmentOptions)
            {
                _unitOfWork = unitOfWork;
                _registrationRepository = registrationRepository;
                _notificationService = notificationService;
                _environmentOptions = environmentOptions;
            }

            protected override void OnNextCore(IList<ParticipantRegistredMessage> messages)
            {
                var registration = _registrationRepository.GetById(messages.First().RegistrationId);

                var registeredParticipantIds = messages.Select(m => m.ParticipantId).ToArray();
                var registeredParticipantNames = registration.RegistrationParticipants
                    .Where(rp => registeredParticipantIds.Contains(rp.ResultingParticipantId.GetValueOrDefault()))
                    .OrderBy(rp => rp.Name)
                    .Select(rp => rp.Name);

                string[] messageLines = {
                    $"Hallo {registration.Applicant.Givenname}",
                    $"Vielen dank für das definitive Anmelden von {registeredParticipantNames.ToCommaSeparatedGrammaticalSequence()} an unserem Kursangebot. Schauen Sie jederzeit vorbei:",
                    string.Format(_environmentOptions.Current().RegistrationFrontendUrl, registration.Id)
                };

                _notificationService.SendNotification(
                    registration.Applicant.PhoneNumber, 
                    Constants.NotificationIds.APPLICANT_REGISTRATION_COMPLETE, 
                    new[] { registration.Id.ToString() },
                    string.Join(Environment.NewLine, messageLines)
                );

                _unitOfWork.Commit();
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