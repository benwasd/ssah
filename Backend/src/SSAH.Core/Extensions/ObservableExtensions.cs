using System;

using Autofac;

namespace SSAH.Core.Extensions
{
    public static class ObservableExtensions
    {
        public static IDisposable SubscribeInUnitOfWorkScope<T, TObserverTypeToSubscribe>(this IObservable<T> source, IContainer rootContainer)
            where TObserverTypeToSubscribe : IObserver<T>
        {
            return source.Subscribe(
                onNext: v => {
                    using (var unit = GetFactory().Begin())
                    {
                        unit.Dependent.OnNext(v);
                    }
                },
                onCompleted: () =>
                {
                    using (var unit = GetFactory().Begin())
                    {
                        unit.Dependent.OnCompleted();
                    }
                },
                onError: e =>
                {
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