const Rizad = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../stella');
const config = require('../config');

if (config.WORKTYPE == 'private') {

Rizad.tostella({pattern: 'rizad', fromMe: true, desc: 'Its send owner number'}, (async (message, match) => {

            const Riizad = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:' + config.PLK + '\n' /
            + 'ORG:Stella Bot;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=' + Config.PHONE + ':' + Config.PHONE + ' \n'
            + 'END:VCARD'
await message.client.sendMessage(message.jid, {displayname: "Owner", vcard: Riizad}, MessageType.contact);

  }));
}

else if (config.WORKTYPE == 'public') {

Rizad.tostella({pattern: 'rizad', fromMe: false, desc: 'Its send owner number'}, (async (message, match) => {
         var mode = ''
if (config.PLK == 'Riizad') mode = 'ᴅᴇᴠᴇʟᴏᴘᴇʀ : '

else mode = 'ᴏᴡɴᴇʀ : '
            
            const Riizad = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:' + config.PLK + '\n' 
            + 'ORG:Stella;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=' + Config.PHONE + ':' + Config.PHONE + ' \n'
            + 'END:VCARD'
await message.client.sendMessage(message.jid, {displayname: "Owner", vcard: Riizad}, MessageType.contact);

  }));
}
