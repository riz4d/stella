/* Copyright (C) 2021 Mohamed Rizad
*/

const Stella = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('ttp');
const MLang = Language.getString('messages');
const KLang = Language.getString('keys');


if (Config.LANG == 'ES') imUrl = '!Necesito una url de una imagen¡'
if (Config.LANG == 'EN') imUrl = '!I need the url of an image¡'

let wk = Config.WORKTYPE == 'public' ? false : true
/*
Stella.addCommand({pattern: 'infottp', fromMe: wk, desc: Lang.info_ttp}, (async (message, match) => {
    await message.sendMessage('┏━━━━━━━━━━━━━━━━━━━ \ n┃〘 * TTP COMMANDS *〙 \ n┗━━━━━━━━━━━━━━━━━━ ━ \ n┠⊷️ ➡️ / ttp \ n Write the text on an image. \ N \ n┠⊷️ ➡️ / attp \ n Write the text on a colored sticker. \ N \ n┠⊷️ ➡️ / animettp \ n Write the text over an anime image. \ n \ n┠⊷️ ➡️ / breakwallttp \ n Write the text on a broken neon wall. \ n \ n┠⊷️ ➡️ / flamettp \ n Write the text on fire. \ n \ n┠⊷️ ➡️ / bannernarutottp \ n Write the text over a * Naruto * banner. \ n \ n┠⊷️ ➡️ / darkneonttp \ n Write the text over a neon image. \ n \ n┠⊷ ️ ➡️ / burnpaperttp \ n Write the text on a burning paper. \ N \ n┠⊷️ ➡️ / harryttp \ n Write the text of one over the * Harry Potter * logo. \ N \ n┠⊷️ ➡️ / candlemugttp \ n Write the text on a mug with sweets. \ n \ n┠⊷️ ➡️ / mugflowerttp \ n Write the text on a mug with flowers. \ n \ n┠⊷️ ➡️ / lovemsgttp \ n Write the text on a mug with flowers2. \ n \ n┠⊷️ ➡️ / quadrottp \ n Write the text on a box with hearts. \ n \ n┠⊷️ ➡️ / shadowttp \ n Write the text on a paper c on shadow. \ n \ n┠⊷️ ➡️ / coffeecupttp \ n Write the text on a cup of coffee. \ n \ n┠⊷️ ➡️ / sweetcandyttp \ n Write the text on a table with sweets. \ n \ n┠ ⊷️ ➡️ / woodttp \ n Writes the text on a table in the form of a carving. \ N \ n┠⊷️ ➡️ / matrixttp \ n Writes the text over the * Matrix * logo. \ N \ n┠⊷️ ➡️ / bneonttp \ n Write the text in Neon Cool. \ n \ n┏━━━━━━━━━━━━━━━━━━━ \ n * Stella * your Girl friend 😉 \ n┗━━━━ ━━━━━━━━━━━━━━━ \ n');
}));
*/
Stella.addCommand({ pattern: 'ttp ?(.*)', fromMe: wk, desc: Lang.TTP_DESC }, (async (message, match) => {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var uri = encodeURI(match[1])
    var ttinullimage = await axios.get('https://api.xteam.xyz/ttp?file&text=' + uri, { responseType: 'arraybuffer' })
    await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: `${MLang.by}` })
}));

Stella.addCommand({ pattern: 'attp ?(.*)', fromMe: wk, desc: Lang.ATTP_DESC }, (async (message, match) => {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var uri = encodeURI(match[1])
    var ttinullimage = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
    await message.client.sendMessage(message.jid,Buffer.from(ttinullimage.data), MessageType.sticker, { mimetype: Mimetype.webp })
}));
