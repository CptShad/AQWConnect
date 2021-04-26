const DiscordModule = require('discord.js');
const AQMessage = require('./AQMessage')
const path = require("path");
const Log = require('./Log')
const { dialog } = require('electron')

//Deleted the Config Json cache and updates the require whenever the config file is edited.
//This enables Dynamic JSON File Loading
function nocache(module) {
	require("fs").watchFile(path.resolve(module), () => {
		console.log("Config File Updated");
		delete require.cache[require.resolve(module)]; Config = require(module)
	})
}
nocache(path.join(__dirname, "..", "Config.json"));
var Config = require(path.join(__dirname, "..", "Config.json"))

function ReadyListener(client)
{
	console.log(`Logged in as ${client.user.tag}!`);
	dialog.showMessageBox({
		message: `Logged in as ${client.user.tag}!`
	})
}

/**
 * Finds the in game channel from discord channel name
 * @param {String} channel 
 * @returns In-Game Channel Name
 */
function findZone(channel)
{
	if (channel == Config['discord']['zone']['name'])
		return "zone";
	if (channel == Config['discord']['party']['name'])
		return "party";
	if (channel == Config['discord']['guild']['name'])
		return "guild";
	if (channel == Config['discord']['whisper']['name'])
		return "whisper";
	return "";
}

/**
 * Handles DM Command
 * @param {String} sender 
 * @param {String} reciever 
 * @param {String} message 
 */
function DMHandler(sender, reciever, message)
{
	if (Config['chatLogFile']['enabled'] && Config['chatLogFile']['LogDiscordMessages'])
			Log.Write(`[Discord] ${sender} -> ${reciever} : ${message}`);
	if (Config['game']['LogDiscrims'])
		message = `${sender} : ${message}`;

	message = AQMessage.XMLEncode(message);
	AQMessage.SendDM(message, reciever);
}

/**
 * Handles Text Messages
 * @param {String} message 
 * @param {String} zone 
 */
function TextHandler(sender, message, zone)
{
	if (Config['chatLogFile']['enabled'] && Config['chatLogFile']['LogDiscordMessages'])
			Log.Write(`[Discord] ${sender} : ${message}`);
	if (Config['game']['LogDiscrims'])
		message = `${sender} : ${message}`;

	message = AQMessage.XMLEncode(message);
	AQMessage.Send(message, zone);
}

/**
 * 
 * @param {DiscordModule.Message} Message 
 */
function MessageListener(Message)
{
	//Return if message is not from an enabled channel or from the bot
	var BotChannels = [Config['discord']['zone']['name'], Config['discord']['party']['name'], Config['discord']['guild']['name'], Config['discord']['whisper']['name']];
	if (!BotChannels.includes(Message.channel.name) || Message.author.id == Discord.Client.user.id)
		return;
	if (!Config['discord'][findZone(Message.channel.name)]['enabled']) 
		return;

	var Content = String(Message.content);
	var defaultMatch = /(\w{2,3}) (.+)/;
	var match = Content.match(/(\w{2,3}) (.+):\s*(.+)/);
	var defaultMatched = false;
	if (match == null) 
	{
		match = Content.match(defaultMatch);
		if (match) defaultMatched = true;
	}
	//match[0] = full string
	//match[1] = command
	//match[2] = command arg
	//match[3] = message
	if (!Config['discord']['SeamlessMode'] && match != null)
	{
		if (Content.startsWith(Config['discord']['Prefix']))
		{
			if (match[1].toLocaleLowerCase() == "dm") {
				DMHandler(Message.author.username, match[2], match[3]);
				return;
			}
			if (match[1].toLocaleLowerCase() == "msg") {
				TextHandler(Message.author.username,
					defaultMatched ? match[2] : match[3], defaultMatched ? "zone" : match[2]);
				return;
			}
		}
		else return; //Dosent start with prefix while seamless mode is off.
	}
	else if (Config['discord']['SeamlessMode'])
	{
		var zone = findZone(Message.channel.name);
		TextHandler(Message.author.username, Content, zone);
	}
}

class Discord
{
	static Token;
	static Client;
	static IsReady;
	static IsLogging;
	static Prefix;
	static Initiate(token, enableLogging)
	{
		this.Token;
		this.Client = new DiscordModule.Client();
		this.IsReady = true;
		this.IsLogging = enableLogging;
		this.Client.login(token).catch(err => {
			console.log("Invalid Token")
			this.IsReady = false;
		});
		if (this.IsReady)
			this.RegisterEvents();
	}
	static RegisterEvents()
	{
		this.Client.on('ready', ReadyListener.bind(null, this.Client));
		this.Client.on('message', MessageListener.bind(null));
	}
	static UpdateLogging(logging)
	{
		this.IsLogging = logging;
	}

	/**
	 * 
	 * @param {String} Message 
	 * @param {String} Channel 
	 */
	static SendMessage(Message, Channel)
	{
		try {
			var CategoryName = Config['discord']['CategoryName'];
			var ChannelName = Config['discord'][Channel]['name'];
			var Category = Discord.Client.channels.cache.find(ch => ch.type == "category" && ch.name.toLowerCase() == CategoryName.toLowerCase())
			var ChannelbyName = Category.children.find(ch =>  ch.name.toLowerCase() == ChannelName.toLowerCase());
			if (ChannelbyName != null)
			{
				console.log(Message);
				Log.Write(Message);
				if (Config['discord']['embedMessages'])
					ChannelbyName.send({
						embed: {
							color: 51455,
							description : Message,
							title : "In-Game Chat Message",
							timestamp: new Date(),
							footer: {
								text: "AQW Connect",
								icon_url: "https://imgur.com/GW8sXRK.png"
							}
						}
					});
				else ChannelbyName.send(Message);
			}
		}
		catch(error) {
			console.log("Error finding discord channel.")
		}
	}

	/**
	 * 
	 * @param {String} Message 
	 * @param {String} Sender 
	 * @param {Boolean} IsWhisper 
	 */
	static SendDiscordMessage(Message, Sender, IsWhisper = false)
	{
		Message = AQMessage.XMLDecode(Message);

		if (IsWhisper && this.IsReady && Config['discord']['whisper']['enabled'])
		{
			this.SendMessage(`[WHISPER  ${Message.split('%')[5]} -> ${Message.split('%')[6]}] : ${Message.split('%')[4]}`, "whisper");
		}
		else if (Message.split('~')[0].includes("guild") && this.IsReady && Config['discord']['guild']['enabled'])
		{
			this.SendMessage(`[GUILD] ${Sender}: ${Message.split('~')[1]}`, "guild");
		}
		else if (Message.split('~')[0].includes("party") && this.IsReady && Config['discord']['party']['enabled'])
		{
			this.SendMessage(`[PARTY] ${Sender}: ${Message.split('~')[1]}`, "party");
		}
		else if (Message.split('~')[0].includes("zone") && this.IsReady && Config['discord']['zone']['enabled'])
		{
			this.SendMessage(`[ZONE] ${Sender}: ${Message.split('~')[1]}`, "zone");
		}
	}
}

module.exports = Discord;

