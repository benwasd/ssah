using System.Collections.Generic;

using Autofac;

namespace SSAH.Core.Messaging
{
    public class AutoMessageObserverAttacher
    {
        private readonly IQueue _queue;
        private readonly IEnumerable<AutoAttachMessageObserverBase> _registeredAutoAttachMessageObservers;

        public AutoMessageObserverAttacher(IQueue queue, IEnumerable<AutoAttachMessageObserverBase> registeredAutoAttachMessageObservers)
        {
            _queue = queue;
            _registeredAutoAttachMessageObservers = registeredAutoAttachMessageObservers;
        }

        public void Start(IContainer rootContainer)
        {
            foreach (var registeredAutoAttachMessageObserver in _registeredAutoAttachMessageObservers)
            {
                registeredAutoAttachMessageObserver.Setup(_queue, rootContainer);
            }
        }
    }
}