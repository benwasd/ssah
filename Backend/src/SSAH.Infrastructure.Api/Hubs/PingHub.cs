using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

namespace SSAH.Infrastructure.Api.Hubs
{
    public class PingHub : Hub
    {
        private readonly PingHubQueueBridge _pingHubQueueBridge;

        public PingHub(PingHubQueueBridge pingHubQueueBridge)
        {
            _pingHubQueueBridge = pingHubQueueBridge;
        }

        public override Task OnConnectedAsync()
        {
            _pingHubQueueBridge.Connecting(Context.ConnectionId, Clients.All);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _pingHubQueueBridge.Disconnecting(Context.ConnectionId, Clients.All);
            return base.OnDisconnectedAsync(exception);
        }
    }
}