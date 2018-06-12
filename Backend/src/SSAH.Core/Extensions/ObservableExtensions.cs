using System;

using Autofac;

using Microsoft.Extensions.Logging;

namespace SSAH.Core.Extensions
{
    public static class ObservableExtensions
    {
        public static IDisposable SubscribeInUnitOfWorkScope<T, TObserverTypeToSubscribe>(this IObservable<T> source, IContainer rootContainer)
            where TObserverTypeToSubscribe : IObserver<T>
        {
            var logger = rootContainer.Resolve<ILogger>();

            return source.Subscribe(
                onNext: v => {
                    logger.LogInformation("UnitOfWork Observer {0} got a new message of type {1}", typeof(TObserverTypeToSubscribe), v?.GetType().Name);

                    using (var unit = GetFactory().Begin())
                    {
                        unit.Dependent.OnNext(v);
                    }
                },
                onCompleted: () =>
                {
                    logger.LogInformation("UnitOfWork Observer {0} completed", typeof(TObserverTypeToSubscribe));

                    using (var unit = GetFactory().Begin())
                    {
                        unit.Dependent.OnCompleted();
                    }
                },
                onError: e =>
                {
                    logger.LogInformation("UnitOfWork Observer {0} got an error {1}", typeof(TObserverTypeToSubscribe), e);

                    using (var unit = GetFactory().Begin())
                    {
                        unit.Dependent.OnError(e);
                    }
                }
            );

            IUnitOfWorkFactory<TObserverTypeToSubscribe> GetFactory()
            {
                return rootContainer.Resolve<IUnitOfWorkFactory<TObserverTypeToSubscribe>>();
            }
        }
    }
}