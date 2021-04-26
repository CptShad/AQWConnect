const {ipcRenderer} = require('electron')

ipcRenderer.on('SendPacket', (event, arg) => {
    console.log(arg)
    window['gameSWF'].SendPacket(arg);
})
ipcRenderer.on('Login', (event, arg) => {
    window['gameSWF'].Login();
});
ipcRenderer.on('Connect', (event, arg) => {
    window['gameSWF'].Connect(arg);
})

function packet(packet)
{
    ipcRenderer.send('packet', packet);
}

function disconnect()
{
    ipcRenderer.send("disconnect-called");
}

onload = function () {
    
}