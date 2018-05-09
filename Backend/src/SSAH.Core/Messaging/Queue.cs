using System;
using System.Reactive;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Reactive.Subjects;

namespace SSAH.Core.Messaging
{
    public class Queue : ObservableBase<IEvent>, IQueue
    {
        private readonly EventLoopScheduler _scheduler;
        private readonly Subject<IEvent> _subject;

        public Queue()
        {
            _scheduler = new EventLoopScheduler();
            _subject = new Subject<IEvent>();
        }

        public void Publish(IEvent @event)
        {
            _subject.OnNext(@event);
        }

        protected override IDisposable SubscribeCore(IObserver<IEvent> observer)
        {
            return _subject.ObserveOn(_scheduler).Subscribe(observer);
        }
    }
}