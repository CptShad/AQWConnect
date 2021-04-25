const DiscordModule = require('discord.js');
const AQMessage = require('./AQMessage')
const path = require("path");

const Log = require('./Log')

function nocache(module) {
	require("fs").watchFile(path.resolve(module), () => {
		console.log("Config File Updated")
		delete require.cache[require.resolve(module)]; Config = require(module)
	})
}
nocache(path.join(__dirname, "..", "Config.json"));
var Config = require(path.join(__dirname, "..", "Config.json"))

function ReadyListener(client)
{
	console.log(`Logged in as ${client.user.tag}!`);
}


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
 * 
 * @param {DiscordModule.Message} Message 
 * @returns 
 */
function MessageListener(Message)
{
	var Content = String(Message.content);
	if (Content.toLowerCase().includes(Config['discord']['Prefix'] + "dm "))
	{
		var message = Content.substring(Content.indexOf(':') + 1);
		var reciever = Content.substring(4, Content.indexOf(':'));

		if (Config['chatLogFile']['enabled'] && Config['chatLogFile']['LogDiscordMessages'])
			console.Log(`[Discord] ${Message.author.username} -> ${reciever} : ${message}`);
		if (Config['game']['LogDiscrims'])
			message = `${Message.author.username} : ${message}`;

		message = AQMessage.XMLEncode(message);
		AQMessage.SendDM(message, reciever);
		return;
	}

	if ((Content.toLowerCase().includes(Config['discord']['Prefix'] + "msg ") && Content.includes(':')) || Config['discord']['SeamlessMode'])
	{
		var message = "";
		var argument = "";
		if (Config['discord']['SeamlessMode'])
		{
			message = Content;
			argument = findZone(Message.channel.name);
			if (argument == "" || Message.author.id == Discord.Client.user.id)
				return;
		}
		else
		{
			message = Content.substring(Content.indexOf(':') + 1);
			if(message[0] == ' ') message = message.substring(1);
			argument = Content.substring(5, Content.indexOf(':'));
			if (Content.indexOf(':') > 10)
				argument = "zone";
		}

		if (Config['chatLogFile']['enabled'] && Config['chatLogFile']['LogDiscordMessages'])
			console.Log(`[Discord] ${Message.author.username} : ${message}`);
		if (Config['game']['LogDiscrims'])
			message = `${Message.author.username} : ${message}`;

		message = AQMessage.XMLEncode(message);
		AQMessage.Send(message, argument);
		return;
	}

	if (Content.toLowerCase().includes(Config['discord']['Prefix'] + "msg "))
	{
		var message = Content.substring(5);
		if (Config['chatLogFile']['enabled'] && Config['chatLogFile']['LogDiscordMessages'])
			console.Log(`[Discord] ${Message.author.username} : ${message}`);
		if (Config['game']['LogDiscrims'])
			message = `${Message.author.username} : ${message}`;

		message = AQMessage.XMLEncode(message);
		AQMessage.Send(message, "zone");
		return;
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
		var CategoryName = Config['discord']['CategoryName'];
		var ChannelName = Config['discord'][Channel]['name'];
		var Category = Discord.Client.channels.cache.find(ch => ch.type === "category" && ch.name == CategoryName)
		var ChannelbyName = Category.children.find(ch =>  ch.name == ChannelName);
		if (ChannelbyName != null)
		{
			console.log(Message);
			Log.Write(Message);
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
