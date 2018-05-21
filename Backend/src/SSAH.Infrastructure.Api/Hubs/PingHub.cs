using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

namespace SSAH.Infrastructure.Api.Hubs
{
    public class PingHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }        
    }
}