const { Client }  = require('discord-rpc')

class DiscordRPC
{
	constructor(clientid) {
        this.clientid = clientid;
		this.client;
		this.Initialized = false;
    }
	
	Initialize()
	{
		this.client = new Client({ transport: 'ipc' });
		this.client.on('ready', () => {
			console.log('DiscordRPC Connected to', this.client.user.username);

			this.client.setActivity({
				details: 'Playing AQW',
				state: 'By : CptShad#7140',
				startTimestamp: new Date(),
				largeImageKey: 'icon',
				largeImageText: 'AQW Connect',
				instance: false
			});
			
			console.log('Updated Presence');
			this.Initialized = true;
		});
	}

	Start()
	{
		try
		{
			if (!this.Initialized) 
				this.Initialize();
			var clientID = this.clientid;
			this.client.login({ clientId: clientID });
		}
		catch {
			console.log("Discord RPC failed to connect");
		}
	}
}
module.exports = DiscordRPC;