using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Threading.Tasks;

using Autofac;

using SSAH.Core.Domain.Entities;
using SSAH.Core.Domain.Messages;
using SSAH.Core.Domain.Objects;
using SSAH.Core.Extensions;
using SSAH.Core.Messaging;
using SSAH.Core.Services;

namespace SSAH.Core.Domain.Demanding
{
    public class AccomplishDemandForRegistration : AutoAttachMessageObserverBase
    {
        protected override IEnumerable<IDisposable> SetupCore(IQueue queue, IContainer rootContainer)
        {
            yield return queue
                .OfType<IInterestRegisteredChangeMessage>()
                .SubscribeInUnitOfWorkScope<IInterestRegisteredChangeMessage, Handler>(rootContainer);
        }

        public class Handler : ObserverBase<IInterestRegisteredChangeMessage>
        {
            private readonly IDemandService _demandService;
            private readonly IRegistrationRepository _registrationRepository;
            private readonly INotificationService _notificationService;
            private readonly IUnitOfWorkFactory<INotificationService> _isolatedNotificationService;

            public Handler(IDemandService demandService, IRegistrationRepository registrationRepository, INotificationService notificationService, IUnitOfWorkFactory<INotificationService> isolatedNotificationService)
            {
                _demandService = demandService;
                _registrationRepository = registrationRepository;
                _notificationService = notificationService;
                _isolatedNotificationService = isolatedNotificationService;
            }

            protected override void OnNextCore(IInterestRegisteredChangeMessage message)
            {
                var changedRegistration = _registrationRepository.GetById(message.RegistrationId);

                foreach (var participantAffectedFromChange in AllWaitingRegistrationParticipantAffectedFromChange(changedRegistration).Where(p => p.Registration.Id != message.RegistrationId))
                {
                    var hadNoDemand = HadNoDemandWhenCreatedOrChanged(participantAffectedFromChange);
                    var alreadyNotified = WasAlreadyNotified(participantAffectedFromChange);
                    if (hadNoDemand && !alreadyNotified)
                    {
                        var demand = _demandService.GetGroupCourseDemand(
                            participantAffectedFromChange.RegistrationParticipant.Discipline,
                            participantAffectedFromChange.RegistrationParticipant.NiveauId,
                            participantAffectedFromChange.Registration.AvailableFrom,
                            participantAffectedFromChange.Registration.AvailableTo
                        );

                        if (demand.Any())
                        {
                            NotifyAsync(participantAffectedFromChange).Wait();
                        }
                    }
                }
            }

            protected override void OnErrorCore(Exception error)
            {
            }

            protected override void OnCompletedCore()
            {
            }

            private IEnumerable<RegistrationWithParticipant> AllWaitingRegistrationParticipantAffectedFromChange(Registration changedRegistration)
            {
                foreach (var criterias in GetCriteriasAffectedFromChange(changedRegistration))
                {
                    var waitingRegistrations = _registrationRepository.GetRegisteredParticipantOverlappingPeriod(
                        criterias.CourseType, criterias.Discipline, criterias.NiveauId, criterias.From, criterias.To, onlyUncommittedRegistrations: true
                    );

                    foreach (var waitingRegistration in waitingRegistrations)
                    {
                        yield return waitingRegistration;
                    }
                }
            }

            private bool HadNoDemandWhenCreatedOrChanged(RegistrationWithParticipant participantAffectedFromChange)
            {
                return true;
            }

            private bool WasAlreadyNotified(RegistrationWithParticipant registrationParticipant)
            {
                return _notificationService.HasNotified(
                    registrationParticipant.Registration.Applicant.PhoneNumber,
                    Constants.NotificationIds.ACCOMPLISH_DEMAND_FOR_REGISTRATION,
                    NotificationSubject(registrationParticipant)
                );
            }
            
            private async Task NotifyAsync(RegistrationWithParticipant registrationParticipant)
            {
                using (var unitOfWork = _isolatedNotificationService.Begin())
                {
                    string[] messageLines = {
                        $"Hallo {registrationParticipant.Registration.Applicant.Givenname}",
                        $"Für {registrationParticipant.RegistrationParticipant.Name} wurde eine passende Kursdurchführung gefunden."
                    };

                    await unitOfWork.Dependent.SendNotification(
                        registrationParticipant.Registration.Applicant.PhoneNumber,
                        Constants.NotificationIds.ACCOMPLISH_DEMAND_FOR_REGISTRATION,
                        NotificationSubject(registrationParticipant),
                        string.Join(Environment.NewLine, messageLines)
                    );

                    unitOfWork.Commit();
                }                
            }

            private static string NotificationSubject(RegistrationWithParticipant registrationParticipant)
            {
                return $"reg={registrationParticipant.Registration.Id} par={registrationParticipant.RegistrationParticipant.Id}";
            }

            private static IEnumerable<DemandingCriterias> GetCriteriasAffectedFromChange(Registration changedRegistration)
            {
                return changedRegistration.RegistrationParticipants
                    .GroupBy(rp => Tuple.Create(rp.CourseType, rp.Discipline, rp.NiveauId))
                    .Select(group => DemandingCriterias.CreateFromRegistration(changedRegistration, group.Key.Item1, group.Key.Item2, group.Key.Item3));
            }
        }
    }
}