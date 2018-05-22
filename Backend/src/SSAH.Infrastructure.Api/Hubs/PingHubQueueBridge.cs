using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

using SSAH.Core.Domain.Messages;
using SSAH.Core.Messaging;

namespace SSAH.Infrastructure.Api.Hubs
{
    public class PingHubQueueBridge    
    {
        private readonly IQueue _queue;
        private readonly object _connectedIdsLockPad = new object();
        private readonly List<string> _connectedIds = new List<string>();
        private IDisposable _notificationSubscription;
        private IClientProxy _allClientProxy;

        public PingHubQueueBridge(IQueue queue)
        {
            _queue = queue;
        }

        public void Connecting(string callerConnectionId, IClientProxy allClients)
        {
            bool hasOne;
            lock (_connectedIdsLockPad)
            {
                _connectedIds.Add(callerConnectionId);
                hasOne = _connectedIds.Count == 1;
            }

            if (hasOne)
            {
                // TODO Handle send exceptions
                _notificationSubscription = _queue.OfType<InterestRegisteredMessage>().Subscribe(m => Notify(m.RegistrationId.ToString()));
            }

            _allClientProxy = allClients;
        }

        public void Disconnecting(string callerConnectionId, IClientProxy allClients)
        {
            bool hasNone;
            lock (_connectedIdsLockPad)
            {
                _connectedIds.Remove(callerConnectionId);
                hasNone = _connectedIds.Count == 0;
            }

            if (hasNone)
            {
                _notificationSubscription.Dispose();
            }

            _allClientProxy = allClients;
        }

        private Task Notify(string message)
        {
            return _allClientProxy.SendAsync("Notify", message);
        }
    }
}