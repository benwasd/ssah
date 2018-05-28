using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Threading.Tasks;

using Autofac;

using Microsoft.Extensions.Options;

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
            private readonly IUnitOfWorkFactory<IRepository<RegistrationParticipant>> _hasDemandUpdateUnitOfWork;
            private readonly IUnitOfWorkFactory<INotificationService> _notificationUnitOfWork;
            private readonly IOptionsMonitor<EnvironmentOptions> _environmentOptions;

            public Handler(
                IDemandService demandService,
                IRegistrationRepository registrationRepository,
                INotificationService notificationService,
                IUnitOfWorkFactory<IRepository<RegistrationParticipant>> hasDemandUpdateUnitOfWork,
                IUnitOfWorkFactory<INotificationService> notificationUnitOfWork,
                IOptionsMonitor<EnvironmentOptions> environmentOptions)
            {
                _demandService = demandService;
                _registrationRepository = registrationRepository;
                _notificationService = notificationService;
                _hasDemandUpdateUnitOfWork = hasDemandUpdateUnitOfWork;
                _notificationUnitOfWork = notificationUnitOfWork;
                _environmentOptions = environmentOptions;
            }

            protected override void OnNextCore(IInterestRegisteredChangeMessage message)
            {
                var changedRegistration = _registrationRepository.GetById(message.RegistrationId);

                foreach (var participantAffectedFromChange in AllWaitingRegistrationParticipantAffectedFromChange(changedRegistration))
                {
                    if (participantAffectedFromChange.Registration.Id == message.RegistrationId)
                    {
                        var demand = GetDemand(participantAffectedFromChange);
                        UpdateHasDemandIndicator(participantAffectedFromChange.RegistrationParticipant.Id, hasDemandWhenLastCreatedOrModified: demand.Any());
                    }
                    else
                    {
                        var hadNoDemand = HadNoDemandWhenCreatedOrModified(participantAffectedFromChange);
                        var alreadyNotified = WasAlreadyNotified(participantAffectedFromChange);
                        if (hadNoDemand && !alreadyNotified)
                        {
                            var demand = GetDemand(participantAffectedFromChange);
                            if (demand.Any())
                            {
                                NotifyAsync(participantAffectedFromChange).Wait();
                            }
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

            private IEnumerable<GroupCourseDemand> GetDemand(RegistrationWithParticipant participantAffectedFromChange)
            {
                if (participantAffectedFromChange.RegistrationParticipant.CourseType == CourseType.Group)
                {
                    return _demandService.GetGroupCourseDemand(
                        participantAffectedFromChange.RegistrationParticipant.Discipline,
                        participantAffectedFromChange.RegistrationParticipant.NiveauId,
                        participantAffectedFromChange.Registration.AvailableFrom,
                        participantAffectedFromChange.Registration.AvailableTo
                    );
                }
                else
                {
                    return Enumerable.Empty<GroupCourseDemand>();
                }
            }

            private void UpdateHasDemandIndicator(Guid registrationParticipantId, bool hasDemandWhenLastCreatedOrModified)
            {
                using (var unitOfWork = _hasDemandUpdateUnitOfWork.Begin())
                {
                    var participant = unitOfWork.Dependent.GetById(registrationParticipantId);
                    participant.HasDemandWhenLastCreatedOrModified = hasDemandWhenLastCreatedOrModified;

                    unitOfWork.Commit();
                }
            }

            private static bool HadNoDemandWhenCreatedOrModified(RegistrationWithParticipant participantAffectedFromChange)
            {
                return participantAffectedFromChange.RegistrationParticipant.HasDemandWhenLastCreatedOrModified == false;
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
                using (var unitOfWork = _notificationUnitOfWork.Begin())
                {
                    string[] messageLines = {
                        $"Hallo {registrationParticipant.Registration.Applicant.Givenname}",
                        $"Für {registrationParticipant.RegistrationParticipant.Name} wurde eine passende Kursdurchführung gefunden. Schauen Sie bei Gelegenheit vorbei:",
                        string.Format(_environmentOptions.Current().RegistrationFrontendUrl, registrationParticipant.Registration.Id)
                    };

                    await unitOfWork.Dependent.SendNotification(
                        registrationParticipant.Registration.Applicant.PhoneNumber,
                        Constants.NotificationIds.ACCOMPLISH_DEMAND_FOR_REGISTRATION,
                        new [] { NotificationSubject(registrationParticipant) },
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