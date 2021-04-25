const { app } = require('electron');
const flashTrust = require('nw-flash-trust');
const path = require('path');
const os = require('os');

const appName = "AQWConnect";

let pluginName
switch (os.arch()) {
  case 'x64':
    pluginName = 'pepflashplayer64.dll'
    break
  default:
    pluginName = 'pepflashplayer.dll'
    break
}

app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, 'Flash', pluginName));

const flashPath = path.join(app.getPath('userData'), 'Pepper Data', 'Shockwave Flash', 'WritableRoot');
const trustManager = flashTrust.initSync(appName, flashPath);
trustManager.empty();
trustManager.add(path.resolve(__dirname, '..', 'public', 'swf'));