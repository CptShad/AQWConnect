const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
require("./modules/Flash");
const { ipcMain } = require("electron");
const Discord = require("./modules/Discord");
const AQMessage = require("./modules/AQMessage");
const { fs } = require("fs");

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

app.disableHardwareAcceleration(); 
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    try {
        require('fs').unlinkSync(path.join(__dirname, "Console.log"));
    }
    catch { }
    app.quit();
});


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
    if (args[1] == true)
        Discord.Initiate(args[0], args[1]);
    else Discord.DestroyClient();
});
ipcMain.on("discord-isEnabled", (event) => {
    event.returnValue = Discord.IsLogging;
});

var LoginServer = "Artix";
var AutoRelog = false;
ipcMain.on("set-login-server", (event, server) => {
    LoginServer = server;
})
ipcMain.on("get-login-server", (event) => {
    event.returnValue = LoginServer;
})
ipcMain.on("login", (event) => {
    mainWindow.webContents.send("Login");
})
ipcMain.on("join", (event, server) => {
    mainWindow.webContents.send("Connect", server);
})
ipcMain.on("set-autoRelog", (event, state) => {
    AutoRelog = state;
});
ipcMain.on("get-autoRelog", (event) => {
    event.returnValue = AutoRelog;
});
ipcMain.on("disconnect-called", (event) => {
    if (AutoRelog)
    {
        setTimeout(() => {
            mainWindow.webContents.send("Login");
        }, 2000);
        setTimeout(() => {
            mainWindow.webContents.send("Connect", LoginServer);
        }, 5000);
    }
});

/* FUNCTIONS */
function newWindow(event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) { //Catched "new-window" event
	//Modify the popup window for character page to disable node integration (Needed for JQuery to work)
    event.preventDefault();
    const win = new BrowserWindow({
        webContents: options.webContents, // use existing webContents if provided
        show: true,
        webPreferences: {
            plugins: true
        }
    });
    win.setMenu(null);
    var useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ArtixGameLauncher/2.0.4 Chrome/83.0.4103.122 Electron/9.4.4 Safari/537.36";
    win.loadURL(url, { userAgent: useragent })
}
