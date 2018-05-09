using System.Collections.Generic;

using Autofac;

namespace SSAH.Core.Messaging
{
    public class AutoEventAttacher
    {
        private readonly IQueue _queue;
        private readonly IEnumerable<AutoAttachEventObserverBase> _registeredAutoAttachEventObservers;

        public AutoEventAttacher(IQueue queue, IEnumerable<AutoAttachEventObserverBase> registeredAutoAttachEventObservers)
        {
            _queue = queue;
            _registeredAutoAttachEventObservers = registeredAutoAttachEventObservers;
        }

        public void Start(IContainer rootContainer)
        {
            foreach (var registeredAutoAttachEventObserver in _registeredAutoAttachEventObservers)
            {
                registeredAutoAttachEventObserver.Setup(_queue, rootContainer);
            }
        }
    }
}