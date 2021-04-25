const fs = require("fs");

const DefaultFile = {
    token : "",
    discord :
    {
        Prefix : "!",
        SeamlessMode : false,
        CategoryName : "Game Chat",
        zone :
        {
            enabled : true,
            name : "general"
        },
        party :
        {
            enabled : true,
            name : "party"
        },
        guild :
        {
            enabled : true,
            name : "guild"
        },
        whisper :
        {
            enabled : true,
            name : "whisper"
        }
    },
    game :
    {
        LogDiscrims : false
    },
    chatLogFile :
    {
        enabled : true,
        LogDiscordMessages : false
    }
}

class ConfigHandler
{
    static InitializeConfig()
    {
        if (!fs.existsSync('./Config.json'))
        {
            fs.writeFile('./Config.json', JSON.stringify(DefaultFile, null, '\t'), err => {
                if (err) throw err; 

                console.log("Created default JSON file config.json");
            });
        }
    }
    static UpdateConfig(File) {
        fs.writeFile('./Config.json', JSON.stringify(File, null, '\t'), err => {
            if (err) throw err; 
            console.log("Error Updating JSON file config.json");
        });
    }
}

module.exports.ConfigHandler = ConfigHandler;
module.exports.DefaultFile = DefaultFile;