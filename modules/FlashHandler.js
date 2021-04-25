const {ipcRenderer} = require('electron')

ipcRenderer.on('SendPacket', (event, arg) => {
    console.log(arg)
    window['gameSWF'].SendPacket(arg);
})

function packet(packet)
{
    ipcRenderer.send('packet', packet);
}

onload = function () {
    
}