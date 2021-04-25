const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
require("./modules/Flash");
const { ipcMain } = require("electron");
const Discord = require("./modules/Discord");

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 580,
        webPreferences: {
            plugins: true,
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        frame: true,
    });
    mainWindow.setMenu(null);
    mainWindow.setIcon(path.join(__dirname, 'public', "Logo256.png"));
    mainWindow.webContents.on("new-window", newWindow);
    mainWindow.loadFile(path.join(__dirname, "public", "index.html"));

    require("./modules/app");
}

app.on("ready", createWindow);
app.on("window-all-closed", () => app.quit());




/* IPC SECTION */
ipcMain.on("packet", (event, packet) => {
	//console.log(packet);
    if (Discord.IsLogging && (packet.includes("%xt%chat") || packet.includes("%xt%whisper"))) {
        var Message = packet.split("%")[4];
        var Sender = packet.split("%")[5];
        if (packet.includes("%xt%whisper")) {
            Discord.SendDiscordMessage(packet, Sender, true);
            return;
        }
        Discord.SendDiscordMessage(Message, Sender);
    }
});
ipcMain.on("discord-start", (event, args) => {
    Discord.Initiate(args[0], args[1]);
});
ipcMain.on("discord-isEnabled", (event) => {
    event.returnValue = Discord.IsLogging;
})

/* FUNCTIONS */
function newWindow(event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) { //Catched "new-window" event
	//Modify the popup window for character page to disable node integration (Needed for JQuery to work)
	if (url.includes("http://www.aq.com/character.asp"))
	{
		event.preventDefault();
		const win = new BrowserWindow({
			webContents: options.webContents, // use existing webContents if provided
			show: true,
			webPreferences: {
				plugins: true
			}
		});
		var useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ArtixGameLauncher/2.0.4 Chrome/83.0.4103.122 Electron/9.4.4 Safari/537.36";
		win.loadURL(url, { userAgent: useragent })
	}
}
