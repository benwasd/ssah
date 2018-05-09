using System;
using System.Collections.Generic;
using System.Reactive;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Text;

namespace SSAH.Core.Messaging
{
    public class Queue : IObservable<IEvent>
    {
        public Queue()
        {
            var x = new EventLoopScheduler();
            var obs = new Subject<IEvent>();
            obs.
        }

    }
}