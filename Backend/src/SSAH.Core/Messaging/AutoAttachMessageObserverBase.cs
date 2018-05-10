using System;
using System.Collections.Generic;
using System.Linq;

using Autofac;

namespace SSAH.Core.Messaging
{
    public abstract class AutoAttachMessageObserverBase : IDisposable
    {
        private IDisposable[] _disposables;

        public void Setup(IQueue queue, IContainer rootContainer)
        {
            _disposables = SetupCore(queue, rootContainer).ToArray();
        }

        protected abstract IEnumerable<IDisposable> SetupCore(IQueue queue, IContainer rootContainer);

        public void Dispose()
        {
            foreach (var disposable in _disposables)
            {
                disposable.Dispose();
            }
        }
    }
}