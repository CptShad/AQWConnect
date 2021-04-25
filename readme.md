# AQW Connect
AQW Connect is an AQW Client that uses a Discord Integration system to easily chat with players from the comfort of the Discord interface. This system can be helpful if the game is suffering from fps drops and type lag.

# Disclaimer
- AQW Connect is a separate entity that has no ties or connections to AQWorlds or the Artix Entertainment company and is labelled as a third party program.
- AQW Connect does not log any user or data related information and is a tool solely for the purpose of aiding others and enhancing the quality of their gameplay through a more flexible method of in game interaction.

# What is AQW Connect?
AQW Connect is a modified game client that allows integration of messages to and from the AQWorlds client to Discord. Essentially it will act as a more versatile means of interacting with players within the game as the program allows you to send and receive: Whispers, Party Chat, Guild Chat and Regular Chat through Discord as a medium.

# How to Install?
- Head over to https://github.com/CptShad/AQWConnect/releases and download the latest release which should be in the format : AQW.Connect.VERSION.zip.
- Once downloaded, Open the AQWConnect.exe file and you are off to the races!

# How to build the Bot and get the Bot Token
In order to use the discord bot to log in-game messages, setting up a discord server for the program to log them is required.
- Create a new Discord Server using this template link: https://discord.new/bZSrNUTeN9nk. This server will be used to communicate between the bot and the client.

- Alternatively you can invite the bot to an existing server as long as the following channels are set up under a category called "Game Chat":
  - General
  - Guild
  - Party
  - Whisper
- Follow the instructions here to Build / Make a Discord Bot. Just name it "AQW Connect" or Whatever you want to name the bot. Once you do that, Invite your Bot to the server.
      (https://discordpy.readthedocs.io/en/latest/discord.html)
- Copy the Bot Token by clicking 'Click to Reveal Token' on Bot Tab of your Bot Application.
- Paste that into the 'config.json' file in the 'Config' folder. Open the .json with notepad to edit it (Or open the game and click settings and paste the token in the "Token" field and click "Save Token"
- You are done! Now just launch the game and click 'Connect Discord' to connect your bot to the game :).

# How to log messages to the Discord Channel
- Once your bot is setup and you have added the Token, Open the client and on the top menu bar click 'Connect Discord'. This will connect the Game Client to discord and allow you to see In-Game Messages. \
At any time if you want to stop this, Just click 'Disconnect Discord'.

# How to use the Discord Bot to send Messages In Game
- !msg [your message] \
  Sends the message in the Regular Chat In Game. Example : !msg Hey guys!.
- !msg [party/guild]:[your message] \
  Sends the message in the Party/Guild Chat In Game. Example : !msg guild:Hey guys!.

- !DM [recipient]:[your message] \
  Sends a DM to the recipient. Example : !DM captain shad:Hey guys!.

# Join our Discord!
If you have any issues or just want to hang out and talk, Join our discord! \
Join : https://discord.gg/Kvm54Gv

# Donate
Donations are much appreciated to aid future updates and development of the program :)

[<img src="https://camo.githubusercontent.com/f896f7d176663a1559376bb56aac4bdbbbe85ed1/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f656e5f55532f692f62746e2f62746e5f646f6e61746543435f4c472e676966" alt="paypal" data-canonical-src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" style="max-width:100%;">](https://www.paypal.me/captainshad/)
