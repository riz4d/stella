const Rizad = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { execFile } = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');
const cheerio = require('cheerio')
const FormData = require('form-data')
const Axios = require('axios');

Rizad.tostella({ pattern: 'take', fromMe: true, desc: 'download whatsapp status' }, (async (message, match) => {

  if (message.reply_message === false) return await message.client.sendMessage(message.jid, '```reply to a status```', MessageType.text);
  
  var downloading = await message.client.sendMessage(message.jid, 'stella taking your status..', MessageType.text);
  var location = await message.client.downloadAndSaveMediaMessage({
    key: {
      remoteJid: message.reply_message.jid,
      id: message.reply_message.id
    },
    message: message.reply_message.data.quotedMessage
  }); //created by rizad
if (message.reply_message.video === false && message.reply_message.image) {
  
          ffmpeg(location)
      .save('output.jpg')
      .on('end', async () => {
        await message.client.sendMessage(message.jid, fs.readFileSync('output.jpg'), MessageType.image);
      });
    return
  }

  ffmpeg(location)
    .save('output.jpg')
    .on('end', async () => {
      await message.client.sendMessage(message.jid, fs.readFileSync('output.jpg'), MessageType.image);
    });
  return

  if (message.reply_message.video === true && message.reply_message.video) {
    ffmpeg(location)
      .save('output.mp4')
      .on('end', async () => {
        await message.client.sendMessage(message.jid, fs.readFileSync('output.mp4'), MessageType.video);
      });
    return
  }

  ffmpeg(location)
    .save('output.mp4')
    .on('end', async () => {
      await message.client.sendMessage(message.jid, fs.readFileSync('output.mp4'), MessageType.video);
    });
  return
}));
