const fs = require("fs");
const path = require("path");
const dateFormat = require("dateformat");
const dedent = require("dedent");

const consoleLog = path.join(__dirname, "..", "Console.log");
class Log {
    static logPath;
    static Initialize() {
        var date = dateFormat(new Date(), "dddd, dd mmmm yyyy");

        if (!fs.existsSync(path.join(__dirname, "..", "Logs", date)))
            fs.mkdirSync(path.join(__dirname, "..", "Logs", date), {
                recursive: true,
            });

        var FileNum = 0;
        FileNum = fs.readdirSync(path.join(__dirname, "..", "Logs", date)).length + 1;

        this.logPath = path.join(__dirname, "..", "Logs", date, `Chat Log ${FileNum}.txt`);

        var WelcomeText = dedent`❚█═══════ AQW Connect ═══════█❚
        Day : ${date}
        Log Number : ${FileNum}
        Discord : https://discord.gg/Kvm54Gv
        ❚█═══════ ═══════════ ═══════█❚\n\n
        `;
        fs.writeFile(this.logPath, WelcomeText, (err) => {
            if (err) console.log(err);
        });
    }
    static Write(message, console = false) {
        if (console == false) {
            fs.appendFile(this.logPath, `[${dateFormat(new Date(), "HH:mm:ss")}] ${message}\n`, (err) => {
                if (err) console.log(err);
            });
        }
        else {
            fs.appendFile(this.logPath, `[${dateFormat(new Date(), "HH:mm:ss")}] ${message}\n`, (err) => {
                if (err) console.log(err);
            });

            //Console
            fs.appendFile(consoleLog, `[${dateFormat(new Date(), "HH:mm:ss")}] ${message}\n`, (err) => {
                if (err) console.log(err);
            });
        }
    }  
}
module.exports = Log;