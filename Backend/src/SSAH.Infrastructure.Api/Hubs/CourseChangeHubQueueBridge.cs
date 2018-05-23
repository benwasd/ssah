using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Reactive.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

using SSAH.Core.Domain.Messages;
using SSAH.Core.Messaging;

namespace SSAH.Infrastructure.Api.Hubs
{
    public class CourseChangeHubQueueBridge    
    {
        private readonly IQueue _queue;
        private readonly object _connectedIdsLockPad = new object();
        private readonly List<string> _connectedIds = new List<string>();
        private IDisposable _notificationSubscription;
        private IClientProxy _allClientProxy;

        public CourseChangeHubQueueBridge(IQueue queue)
        {
            _queue = queue;
        }

        public void Connecting(string callerConnectionId, IClientProxy allClients)
        {
            _allClientProxy = allClients;

            bool hasOne;
            lock (_connectedIdsLockPad)
            {
                _connectedIds.Add(callerConnectionId);
                hasOne = _connectedIds.Count == 1;
            }

            if (hasOne)
            {
                // TODO Handle send exceptions
                _notificationSubscription = _queue
                    .OfType<ICommitedCourseChangeMessage>()
                    .Subscribe(m => Notify(m.GetType(), m.InstructorId.ToString(), m.CourseId.ToString()));
            }
        }

        public void Disconnecting(string callerConnectionId, IClientProxy allClients)
        {
            _allClientProxy = allClients;

            bool hasNone;
            lock (_connectedIdsLockPad)
            {
                _connectedIds.Remove(callerConnectionId);
                hasNone = _connectedIds.Count == 0;
            }

            if (hasNone)
            {
                _notificationSubscription.Dispose();
                _allClientProxy = null;
            }
        }

        [SuppressMessage("ReSharper", "UnusedMethodReturnValue.Local")]
        private Task Notify(Type messageType, string instructorId, string courseId)
        {
            return _allClientProxy.SendAsync("Notify", messageType.Name, instructorId, courseId);
        }
    }
}