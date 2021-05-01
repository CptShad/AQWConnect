const fs = require("fs");
const path = require('path')

const DefaultFile = {
    token : "",
    discord :
    {
        Prefix : "!",
        SeamlessMode : false,
        embedMessages : true,
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

const configLoc = path.join(__dirname, "..", "Config.json")
class ConfigHandler
{
    static InitializeConfig()
    {
        if (!fs.existsSync(configLoc))
        {
            fs.writeFile(configLoc, JSON.stringify(DefaultFile, null, '\t'), err => {
                if (err) throw err; 

                console.log("Created default JSON file config.json");
            });
        }
    }
    static UpdateConfig(File) {
        fs.writeFile(configLoc, JSON.stringify(File, null, '\t'), err => {
            if (err) throw err; 
            console.log("Error Updating JSON file config.json");
        });
    }
}

module.exports.ConfigHandler = ConfigHandler;
module.exports.DefaultFile = DefaultFile;