const path = require("path");
const { ConfigHandler, DefaultFile } = require("../modules/ConfigHandler");
const { ipcRenderer } = require("electron");
const Config = require("../Config.json");
var Connected = false;

Connected = ipcRenderer.sendSync("discord-isEnabled");
onload = function () {
    UpdateView();

    var updateTokenBtn = document.getElementById("updateTokenBtn");
    updateTokenBtn.addEventListener("click", () => {
        Config["token"] = document.getElementById("token").value;
        ConfigHandler.UpdateConfig(Config);
    });

    var connectBtn = document.getElementById("connectBtn");
    connectBtn.addEventListener("click", function (event) {
        if (Connected) {
            connectBtn.classList.add("btn-primary");
            connectBtn.classList.remove("btn-red");
            connectBtn.innerText = "Connect Discord";

            Config["token"] = document.getElementById("token").value;
            ConfigHandler.UpdateConfig(Config);
            ipcRenderer.send("discord-start", [
                document.getElementById("token").value,
                false,
            ]);
            Connected = false;
        } else {
            connectBtn.classList.add("btn-red");
            connectBtn.classList.remove("btn-primary");
            connectBtn.innerText = "Disconnect Discord";

            Config["token"] = document.getElementById("token").value;
            ConfigHandler.UpdateConfig(Config);
            ipcRenderer.send("discord-start", [
                document.getElementById("token").value,
                true,
            ]);
            Connected = true;
        }
    });

    var LoginBtn = document.getElementById("loginBtn");
    var JoinBtn = document.getElementById("joinBtn");
    LoginBtn.addEventListener("click", () => {
        var Server = document.getElementById("serverName");
    });
    JoinBtn.addEventListener("click", () => {
        var Server = document.getElementById("serverName");
    });

    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", () => {
        var Token = document.getElementById("tokenConf");
        var prefix = document.getElementById("prefix");
        var Category = document.getElementById("category");

        var seamlessChk = document.getElementById("seamlessChk");

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
        File["token"] = Token.value;
        File["discord"]["Prefix"] = prefix.value;
        File["discord"]["CategoryName"] = Category.value;
        File["discord"]["SeamlessMode"] = seamlessChk.checked;
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
    });

    var autoRelogChk = document.getElementById("autoRelogChk");
};
function UpdateView() {
    var Token = document.getElementById("token");
    var TokenConf = document.getElementById("tokenConf");

    if (Connected) {
        connectBtn.classList.add("btn-red");
        connectBtn.classList.remove("btn-primary");
        connectBtn.innerText = "Disconnect Discord";
    } else {
        connectBtn.classList.add("btn-primary");
        connectBtn.classList.remove("btn-red");
        connectBtn.innerText = "Connect Discord";
    }

    var prefix = document.getElementById("prefix");
    var Category = document.getElementById("category");

    var seamlessChk = document.getElementById("seamlessChk");

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

    Token.value = Config["token"];
    TokenConf.value = Config["token"];
    prefix.value = Config["discord"]["Prefix"];
    Category.value = Config["discord"]["CategoryName"];
    seamlessChk.checked = Config["discord"]["SeamlessMode"];
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
