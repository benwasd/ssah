using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

namespace SSAH.Infrastructure.Api.Hubs
{
    public class CourseChangeHub : Hub
    {
        private readonly CourseChangeHubQueueBridge _courseChangeHubQueueBridge;

        public CourseChangeHub(CourseChangeHubQueueBridge courseChangeHubQueueBridge)
        {
            _courseChangeHubQueueBridge = courseChangeHubQueueBridge;
        }

        public override Task OnConnectedAsync()
        {
            _courseChangeHubQueueBridge.Connecting(Context.ConnectionId, Clients.All);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _courseChangeHubQueueBridge.Disconnecting(Context.ConnectionId, Clients.All);
            return base.OnDisconnectedAsync(exception);
        }
    }
}