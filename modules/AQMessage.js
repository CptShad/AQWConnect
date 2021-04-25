const { BrowserWindow } = require('electron');

class AQMessage {
    static FlashCall(func, message)
    {
        BrowserWindow.getAllWindows()[0].webContents.send(func, message);
    }

    /**
     * @param {String} Message 
     * @param {String} Region 
     */
    static Send(Message, Region)
    {
        if (Message.length > 150)
        {
            var NoOfMessages = Math.ceil(Message.length / 150.0);
            for (i = 0; i < NoOfMessages; i++)
            {
                var startIndex = i * 149 + i;
                var SplitMessage = `${Message.substring(startIndex, startIndex + 149)}-`;
                var XtMessage = `%xt%zm%message%1%${SplitMessage}%${Region}%`;
                
                var interval = setTimeout(this.FlashCall, 500, "SendPacket", XtMessage);
                if (i == 0) clearTimeout(interval);
            }
        }
        else
        {
            var XtMessage = `%xt%zm%message%1%${Message}%${Region}%`;
            this.FlashCall("SendPacket", XtMessage);
        }
    }

    /**
     * 
     * @param {String} Message 
     * @param {String} Reciever 
     */
    static SendDM(Message, Reciever)
    {
        if (Message.Length > 150)
        {
            var NoOfMessages = Math.ceil(Message.length / 150.0);
            for (i = 0; i < NoOfMessages; i++)
            {
                var startIndex = i * 149 + i;
                var SplitMessage = `${Message.substring(startIndex, startIndex + 149)}-`;
                var XtMessage = `%xt%zm%whisper%1%${SplitMessage}%${Reciever}%`;

                var interval = setTimeout(this.FlashCall, 500, "SendPacket", XtMessage);
                if (i == 0) clearTimeout(interval);
            }
        }
        else
        {
            var XtMessage = `%xt%zm%whisper%1%${Message}%${Reciever}%`;
            this.FlashCall("SendPacket", XtMessage);
        }
    }

    /**
     * @param {String} XMLEncoded 
     * @returns {String}
     */
    static XMLDecode(XMLEncoded)
    {   
        return XMLEncoded
            .replace(RegExp("(#060:)", "g"), "<")
            .replace(RegExp("(#062:)", "g"), ">")
            .replace(RegExp("(#038:)", "g"), "&")
            .replace(RegExp("(#037:)", "g"), "%");
    }

    /**
     * @param {String} XMLDecoded 
     * @returns {String}
     */
    static XMLEncode(XMLDecoded)
    {
        return XMLDecoded
            .replace(RegExp("<", "g"), "#060:")
            .replace(RegExp(">", "g"), "#062:")
            .replace(RegExp("&", "g"), "#038:")
            .replace(RegExp("%", "g"), "#037:")
            .replace(RegExp("“", "g"), "\"")
            .replace(RegExp("”", "g"), "\"")
            .replace(RegExp("‘", "g"), "\'")
            .replace(RegExp("’", "g"), "\'");
    }c
}

module.exports = AQMessage;