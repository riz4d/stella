/* Coded by riz4d
*/

const Rizad = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const got = require('got');
const Config = require('../config');
// const White = require('../white');
const LOAD_ING = "*TRYING TO DOWNLOAD*"
const UPLOAD_ING = "*✅️ DOWNLOADING COMPLETED* \n\n *UPLOADING IN PROCESS...*"
const axios = require('axios')
const Axios = require('axios')

const conf = require('../config');
let wk = conf.WORKTYPE == 'public' ? false : true

Rizad.tostella({pattern: 'ytv ?(.*)', fromMe: wk, desc: 'video downloading links from youtube'}, async (message, match) => {

var reply = await message.client.sendMessage(message.jid, LOAD_ING , MessageType.text, { quoted: message.data });
	
        const {data} = await axios(`https://api.zeks.me/api/ytplaymp4?apikey=ApiKannappi&q=${match[1]}`)
	
        const { status, result } = data


	const videoBuffer = await axios.get(`${result.url_video}`, {responseType: 'arraybuffer'})

        if(!status) return await message.sendMessage('*NO RESULT FOUND🥲*')

	reply = await message.client.sendMessage(message.jid,UPLOAD_ING , MessageType.text, { quoted: message.data });

        let msg = '```'
        msg +=  `TITLE :${result.title}\n\n`
        msg +=  `THUMBNAIL :${result.thumbnail}\n\n`
        msg +=  `SOURCE :${result.source}\n\n`
        msg +=  `SIZE :${result.size}\n\n`
        msg +=  `DOWNLOADING LINK :${result.url_video}\n\n`
        msg += '```' 
	 return await message.client.sendMessage(message.jid,Buffer.from(videoBuffer.data), MessageType.video, {mimetype: Mimetype.mp4, ptt: false , caption: msg , }); //thumbnail: White.tm_b 
});
    
