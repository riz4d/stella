const Rizad = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');
const need = "type some word after command\n"

if (Config.WORKTYPE == 'private') {

  Rizad.tostella({ pattern: 'ytbutton ?(.*)', fromMe: true, dontAddCommandList: true }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(need);

    var ttinullimage = await axios.get(`https://api.zeks.xyz/api/gplaybutton?apikey=bY17wlPg4XQvRQkJRqXjPPipPd2&text=$%20=${encodeURIComponent(match[1])}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAP + '\n\nMade by stella' })

  }));
}

else if (Config.WORKTYPE == 'public') {

  Rizad.tostella({ pattern: 'ytbutton ?(.*)', fromMe: false, dontAddCommandList: true }, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.NEED_WORD);

    var webimage = await axios.get(`https://api.zeks.xyz/api/gplaybutton?apikey=bY17wlPg4XQvRQkJRqXjPPipPd2&text=${match[1]}`, { responseType: 'arraybuffer' })

    await message.client.sendMessage(message.jid, Buffer.from(webimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAP + '\n\nMade by Stella' })

  }));

}
