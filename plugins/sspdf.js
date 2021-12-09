const Rizad = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");
const Config = require('../config');

let wk = Config.WORKTYPE == 'public' ? false : true

Rizad.tostella({pattern: 'spdf ?(.*)', fromMe: wk, desc: 'Screenshot a PDF' }, (async (message, match) => {
    if (!match[1]) return await message.sendMessage('*link!*', MessageType.text);
    var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=begC4dFAup1b8LyRXxAfjetfqDg2uYx8PWmh9YJ59tTZXiUyh2Vs72HdYQB68vyc`, { responseType: 'arraybuffer' })
    await message.sendMessage('🤖 *Converting To PDF*', MessageType.text);
    await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf, filename: 'Stella.pdf'});
}));  