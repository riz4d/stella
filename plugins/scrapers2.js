const Rizad = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const got = require('got');
const Config = require('../config');

const axios = require('axios')


const conf = require('../config');
let wk = conf.WORKTYPE == 'public' ? false : true

Rizad.tostella({pattern: 'pint ?(.*)', fromMe: wk, desc: 'it send images from pintrest' }, async (message, match) => {
	
    
            if (match[1] === '') return await message.client.sendMessage(message.jid,"```Need word```");

    var webimage = await axios.get(`https://zenzapi.xyz/api/pinterest2?query=${match[1]}&apikey=Riizad`, { responseType: 'arraybuffer' })

  await message.client.sendMessage(message.jid,Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg})

});

    Rizad.tostella({pattern: 'happymod ?(.*)', fromMe: wk, desc: 'it send mod apk links'}, async (message, match) => {
	  if (match[1] === '') return await message.reply("```need app name```");
	  const url = `https://api.zeks.xyz/api/happymod?apikey=&q=${match[1]}&apikey=1hroZ3ju94h0PBjCNKsfhYaSuLs`;
	  try {
		  const response = await got(url);
		  const json = JSON.parse(response.body);
		  if (response.statusCode === 200) return await message.client.sendMessage(message.jid, 
		  '*📕 ' + 'Name:' +'* ```' + json.result[0].title + '```\n\n' + 
		  '*📘 ' + 'Size:' +'* ```' + json.result[0].size + '```\n\n\n' + 
		  '*📗 ' + 'Link' +':* ```' + json.result[0].link + '```\n', MessageType.text);
	  } catch {
		  return await message.client.sendMessage(message.jid, "```Not founded```", MessageType.text);
	  }
  });
