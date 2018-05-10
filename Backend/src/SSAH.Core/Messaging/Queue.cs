using System;
using System.Reactive;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Reactive.Subjects;

namespace SSAH.Core.Messaging
{
    public class Queue : ObservableBase<IMessage>, IQueue
    {
        private readonly EventLoopScheduler _scheduler;
        private readonly Subject<IMessage> _subject;

        public Queue()
        {
            _scheduler = new EventLoopScheduler();
            _subject = new Subject<IMessage>();
        }

        public void Publish(IMessage message)
        {
            _subject.OnNext(message);
        }

        protected override IDisposable SubscribeCore(IObserver<IMessage> observer)
        {
            return _subject.ObserveOn(_scheduler).Subscribe(observer);
        }
    }
}