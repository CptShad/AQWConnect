const DiscordRPC = require('./discordRPC');
const Discord = require('./Discord')
const Log = require('./Log')

/*Initialize Log*/
Log.Initialize();

/*Start DiscordRPC*/
const client = new DiscordRPC("456867456040960001");
client.Start();
