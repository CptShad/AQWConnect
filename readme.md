<h1 align="center">AQW Connect</h1>
<img src="https://imgur.com/A90qN8l.png">
Welcome to the new version of AQW Connect now made with Electron.js similar to the Official AQW Launcher and AQ Lite launcher! (Image of Version V1.0-Beta)

If you are looking for the source for the old version made in C# then head over to [Old Repo.](https://github.com/CptShad/AQWConnectOld)
Why the new version? Because of the "Flash Kill" and future windows updates removing flash altogether doing it in electron was the next best way and also make it more update date and in line with AE's own official Game Launcher.
Making it in Electron also makes it **Cross Platform** which means you can finally use it on Windows, Mac and Linux!

### [Current Release V1.0-Beta](https://github.com/CptShad/AQWConnect/releases/tag/v1.0-beta)
Download and extract the AQW.Connect zip file according to your operating system and run AQW Connect.exe.


## Table of Contents
* [Introduction](##Introduction)
* [How it works](#How-it-works)
	* [Feature Showcase](#Feature-Showcase)
* [Setup Instructions](#Setup-Instructions)
	* [How to setup Discord Server](#How-to-setup-Discord-Server)
	* [How to build a Discord Bot](#How-to-build-a-Discord-Bot)
	* [How to invite Bot to Server](#How-to-invite-Bot-to-Server)
* [How to use](#How-to-use)
* [Discord](#Join-our-Discord!)

## Introduction
AQW Connect is a modified game client that allows integration of messages to and from the <b>AQWorlds client to Discord</b>. Essentially it will act as a more versatile means of interacting with players within the game as the program allows you to send and receive: Whispers, Party Chat, Guild Chat and Regular Chat through Discord as a medium.

### Disclaimer
- AQW Connect is a separate entity that has no ties or connections to AQWorlds or the Artix Entertainment company and is labelled as a third party program.
- AQW Connect does not log any user or data related information and is a tool solely for the purpose of aiding others and enhancing the quality of their gameplay through a more flexible method of in game interaction.

## How It Works
AQW Connect is a modified game client that runs in electron to connect your game to a discord bot.  

### Feature Showcase
Here are some of the features that are in the program currently, This will be updated as new versions are released but here are some of the main ones.
All or mostly all of the features are controlled through the settings menu. (The screenshot is of version V1.0-Beta.
<img src="https://imgur.com/T2xGOrW.png"></img>
* Ability to Login and Join any server from the settings menu.
* Ability to Auto-Relog if disconnected, The server chosen will be the one in the "Server" Field of "Artix" by default.
* Ability to create chat logs which stores all game chat.  (Needs discord connected to start the logging). Stores the chat logs in neat folders as .txt files according to the day.
<img src = "https://imgur.com/SPHerKM.png">
* Ability to configure the discord server channels according to your needs.
* Log Discrims In-Game : Ability to hide or show who sent the message using discord. (Show their discord name in AQW)
<img src="https://cdn.discordapp.com/attachments/735793063968112660/748594299134017576/unknown.png">
<img src="https://media.discordapp.net/attachments/735793063968112660/748594356432404540/unknown.png">
* Seamless mode: It allows you to send messages from discord without using the prefix (ex``` !msg Hello``` will just be Hello) as long as its the correct channel.
So if you are in the General/zone channel and you type anything in it, it will send it in game
You can do it for General / Party / Guild. For dms you still need to use the command ```(!dm <receiver>:<message>)```
<img src="https://media.discordapp.net/attachments/735793063968112660/748599847908802631/unknown.png">
* Ability to set custom prefix for the discord commands
<img src="https://media.discordapp.net/attachments/735793063968112660/748588899076538438/unknown.png">
* Ability to log messages as embeds or regular
<img src="https://media.discordapp.net/attachments/735793063968112660/748589309262823584/unknown.png">

## Setup Instructions
Below you'll find all the info you need on how to use AQW Connect.

### How to setup the Discord Server
In order to use the discord bot to log in-game messages, setting up a discord server for the program to log them is required.
- Create a new Discord Server using this template link: https://discord.new/bZSrNUTeN9nk. This server will be used to communicate between the bot and the client.
- Alternatively you can invite the bot to an existing server as long as the following channels are set up under a category called "Game Chat":
- General
- Guild
- Party
- Whisper
<img src="https://imgur.com/gWxl6MG.png">
If you want to modify the default layout change the "Category" and "Channel Config" fields accordingly

That is all you need to setup your server, Now just make the bot and invite it!

### How to build a Discord Bot
You need to build a discord bot and connect it to the client and invite it to your server for AQW Connect to work. It is done this way for privacy reasons. If i were to setup one common bot for all the servers then i would be able to see ALL the servers under the bot  and see all the client messaged too. Although this is a bit frustrating, This ensures privacy.
Follow the instructions here to Build / Make a Discord Bot. Just name it "AQW Connect" or Whatever you want to name the bot. Once you do that, Invite your Bot to the server.
https://discordpy.readthedocs.io/en/latest/discord.html
- Copy the Bot Token by clicking 'Click to Reveal Token' on Bot Tab of your Bot Application.
- Paste that into the 'token" field in the settings menu on the client and click "Save Settings"
<img src ="https://imgur.com/AHtZ0BE.png">
- Now click the "Connect Discord" button, If you did everything correctly the bot will now be online in your discord server and its ready and logging.
- If you want to disconnect it from logging, Click the button again to disconnect it.
<img src="https://imgur.com/Luelujt.png">

## How to use
Once the Bot, Server and the settings are all setup, You can use these commands to send messages In-Game using discord commands.
- ```!msg [your message]```
Sends the message in the Regular Chat In Game. Example : !msg Hey guys!.

- ```!msg [party/guild]:[your message]```
Sends the message in the Party/Guild Chat In Game. Example : !msg guild:Hey guys!

- ```!DM [recipient]:[your message]```
Sends a DM to the recipient. Example : !DM captain shad:Hey guys!

# Join our Discord!
If you have any issues or just want to hang out and talk, Join our discord!
Join : https://discord.gg/Kvm54Gv

  

## Donate

Donations are much appreciated to aid future updates and development of the program :)
[<img src="https://camo.githubusercontent.com/f896f7d176663a1559376bb56aac4bdbbbe85ed1/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f656e5f55532f692f62746e2f62746e5f646f6e61746543435f4c472e676966" alt="paypal" data-canonical-src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" style="max-width:100%;">](https://www.paypal.me/captainshad/)
