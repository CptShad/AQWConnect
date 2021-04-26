const path = require("path");
const { ConfigHandler, DefaultFile } = require("../modules/ConfigHandler");
const { ipcRenderer, shell } = require("electron");
const { dialog } = require('electron').remote;
var Config = require("../Config.json");
var Connected = false;

Connected = ipcRenderer.sendSync("discord-isEnabled");
onload = function () {
    UpdateView();

    var connectBtn = document.getElementById("connectBtn");
    connectBtn.addEventListener("click", function (event) {
        if (Connected) {
            connectBtn.classList.add("btn-primary");
            connectBtn.classList.remove("btn-red");
            connectBtn.innerText = "Connect Discord";

            Config["token"] = document.getElementById("tokenConf").value;
            ConfigHandler.UpdateConfig(Config);
            ipcRenderer.send("discord-start", [
                document.getElementById("tokenConf").value,
                false,
            ]);
            Connected = false;
        } else {
            connectBtn.classList.add("btn-red");
            connectBtn.classList.remove("btn-primary");
            connectBtn.innerText = "Disconnect Discord";

            Config["token"] = document.getElementById("tokenConf").value;
            ConfigHandler.UpdateConfig(Config);
            ipcRenderer.send("discord-start", [
                document.getElementById("tokenConf").value,
                true,
            ]);
            Connected = true;
        }
    });

    var LoginBtn = document.getElementById("loginBtn");
    var JoinBtn = document.getElementById("joinBtn");
    LoginBtn.addEventListener("click", () => {
        ipcRenderer.send("login");
    });
    JoinBtn.addEventListener("click", () => {
        var Server = document.getElementById("serverName");
        if (Server.value == "") return;
        ipcRenderer.send("join", Server.value);
    });

    var serverName = document.getElementById('serverName');
    serverName.addEventListener("change", () => {
        ipcRenderer.send("set-login-server", serverName.value);
    });

    var autoRelogChk = document.getElementById("autoRelogChk");
   autoRelogChk.addEventListener("change", () => {
        ipcRenderer.send("set-autoRelog", autoRelogChk.checked);
    })

    var openLogBtn = document.getElementById("openLogBtn");
    openLogBtn.addEventListener("click", () => {
        shell.openPath(path.join(__dirname, "..", "Logs"));
    });

    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", () => {
        var tokenConf = document.getElementById("tokenConf");
        var prefix = document.getElementById("prefix");
        var Category = document.getElementById("category");

        var seamlessChk = document.getElementById("seamlessChk");
        var embedChk = document.getElementById("embedChk");

        var zoneChk = document.getElementById("zoneEnabledChk");
        var zone = document.getElementById("zone");

        var guildChk = document.getElementById("guildEnabledChk");
        var guild = document.getElementById("guild");

        var partyChk = document.getElementById("partyEnabledChk");
        var party = document.getElementById("party");

        var whisperChk = document.getElementById("whisperEnabledChk");
        var whisper = document.getElementById("whisper");

        var logDiscrimsChk = document.getElementById("logDiscrimsChk");

        var enableLogFileChk = document.getElementById("enableLogFileChk");

        var logDiscMsgChk = document.getElementById("logDiscMsgChk");

        var File = DefaultFile;
        File["token"] = tokenConf.value;
        File["discord"]["Prefix"] = prefix.value;
        File["discord"]["CategoryName"] = Category.value;
        File["discord"]["SeamlessMode"] = seamlessChk.checked;
        File['discord']['embedMessages'] = embedChk.checked;
        File["discord"]["zone"]["enabled"] = zoneChk.checked;
        File["discord"]["zone"]["name"] = zone.value;
        File["discord"]["guild"]["enabled"] = guildChk.checked;
        File["discord"]["guild"]["name"] = guild.value;
        File["discord"]["party"]["enabled"] = partyChk.checked;
        File["discord"]["party"]["name"] = party.value;
        File["discord"]["whisper"]["enabled"] = whisperChk.checked;
        File["discord"]["whisper"]["name"] = whisper.value;
        File["game"]["LogDiscrims"] = logDiscrimsChk.checked;
        File["chatLogFile"]["enabled"] = enableLogFileChk.checked;
        File["chatLogFile"]["LogDiscordMessages"] = logDiscMsgChk.checked;

        ConfigHandler.UpdateConfig(File);
        dialog.showMessageBox({
            message: `Config File Saved`
        })
    });

    var resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener("click", () => {
        dialog.showMessageBox({
            message : "Are you sure you want to reset the Config?",
            buttons : [ 'Yes', 'No' ]
        }).then((value) => {
            if (value.response == 0)
            {
                ConfigHandler.UpdateConfig(DefaultFile);
                Config = DefaultFile;
                UpdateView();
            }
        })
    })
};
function UpdateView() {
    var tokenConf = document.getElementById("tokenConf");

    if (Connected) {
        connectBtn.classList.add("btn-red");
        connectBtn.classList.remove("btn-primary");
        connectBtn.innerText = "Disconnect Discord";
    } else {
        connectBtn.classList.add("btn-primary");
        connectBtn.classList.remove("btn-red");
        connectBtn.innerText = "Connect Discord";
    }
    var serverName = document.getElementById('serverName');
    serverName.value = ipcRenderer.sendSync("get-login-server");

    var autoRelogChk = document.getElementById("autoRelogChk");
    autoRelogChk.checked = ipcRenderer.sendSync("get-autoRelog");

    var prefix = document.getElementById("prefix");
    var Category = document.getElementById("category");

    var seamlessChk = document.getElementById("seamlessChk");
    var embedChk = document.getElementById("embedChk");

    var zoneChk = document.getElementById("zoneEnabledChk");
    var zone = document.getElementById("zone");

    var guildChk = document.getElementById("guildEnabledChk");
    var guild = document.getElementById("guild");

    var partyChk = document.getElementById("partyEnabledChk");
    var party = document.getElementById("party");

    var whisperChk = document.getElementById("whisperEnabledChk");
    var whisper = document.getElementById("whisper");

    var logDiscrimsChk = document.getElementById("logDiscrimsChk");

    var enableLogFileChk = document.getElementById("enableLogFileChk");

    var logDiscMsgChk = document.getElementById("logDiscMsgChk");

    tokenConf.value = Config["token"];
    prefix.value = Config["discord"]["Prefix"];
    Category.value = Config["discord"]["CategoryName"];
    seamlessChk.checked = Config["discord"]["SeamlessMode"];
    embedChk.checked = Config['discord']['embedMessages'];
    zoneChk.checked = Config["discord"]["zone"]["enabled"];
    zone.value = Config["discord"]["zone"]["name"];
    guildChk.checked = Config["discord"]["guild"]["enabled"];
    guild.value = Config["discord"]["guild"]["name"];
    partyChk.checked = Config["discord"]["party"]["enabled"];
    party.value = Config["discord"]["party"]["name"];
    whisperChk.checked = Config["discord"]["whisper"]["enabled"];
    whisper.value = Config["discord"]["whisper"]["name"];
    logDiscrimsChk.checked = Config["game"]["LogDiscrims"];
    enableLogFileChk.checked = Config["chatLogFile"]["enabled"];
    logDiscMsgChk.checked = Config["chatLogFile"]["LogDiscordMessages"];
}
