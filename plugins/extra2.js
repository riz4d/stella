const Rizad = require('../events');
const Stella = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");
const fs = require('fs');
const Config = require('../config')


const INBO = "Private Messaging Not Allowed"
const Heroku = require('heroku-client');
const heroku = new Heroku({
	token: Config.HEROKU.API_KEY
});

let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

var rizu_desc = ''
var OFF = ''
var ON = ''

if (Config.LANG == 'EN') {

  rizu_desc = 'change pm block mode'
  OFF = '𝐏𝐦 𝐛𝐥𝐨𝐜𝐤 𝐟𝐞𝐚𝐭𝐮𝐫𝐞 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐬𝐡𝐮𝐭𝐝𝐨𝐰𝐧𝐞𝐝 \n          𝐩𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐟𝐞𝐰 𝐦𝐢𝐧𝐮𝐭𝐞 🧚‍♀️'
  ON = '𝐏𝐦 𝐛𝐥𝐨𝐜𝐤 𝐟𝐞𝐚𝐭𝐮𝐫𝐞 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐨𝐩𝐞𝐧𝐞𝐝 \n          𝐩𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐟𝐞𝐰 𝐦𝐢𝐧𝐮𝐭𝐞 🧚‍♀️'
}

if (Config.LANG == 'ML') {

  rizu_desc = 'pm block mode മാറ്റാൻ'
  OFF = '*Pm Block Mode OFF ആക്കി💌*'
  ON = '*Pm Block Mode ON ആക്കി💌*'
}

Rizad.tostella({ pattern: 'pmblock ?(.*)', fromMe: true, desc: rizu_desc, usage: '.pmblock on / off' }, (async (message, match) => {
  if (match[1] == 'off') {
    await heroku.patch(baseURI + '/config-vars', {
      body: {
                        ['PM_BLOCK']: 'false'
      }
    });
    await message.sendMessage(OFF)
  } else if (match[1] == 'on') {
    await heroku.patch(baseURI + '/config-vars', {
      body: {
                        ['PM_BLOCK']: 'true'
      }
    });
    await message.sendMessage(ON)
  }
}));

 if (Config.PM_BLOCK == 'true') {
Rizad.tostella({on: 'text', fromMe: false, delownsewcmd: false, onlyPm: true }, (async (message, match) => {
        let regexb1ichu = new RegExp('.')
        let regexb2ichu = new RegExp('a')
        let regexb3ichu = new RegExp('e')
        let regexb4ichu = new RegExp('i')
        let regexb5ichu = new RegExp('o')
        let regexb6ichu = new RegExp('u')
          if (regexb1ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          } 
        else if (regexb2ichu.test(message.message)) {
          
           await message.client.sendMessage(message.jid, '*' + INBO + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
         else if (regexb3ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
        else if (regexb4ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
          else if (regexb5ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
          else if (regexb6ichu.test(message.message)) {
           
            await message.client.sendMessage(message.jid, '*' + INBO + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
          }
          
}));

}
    Stella.tostella({ pattern: 'sudo ?(.*)', fromMe: true, desc: 'changes sudo numbers', usage: '.sudo *your number*' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('𝖾𝗇𝗍𝖾𝗋 𝗎𝗋 𝗇𝗎𝗆𝖻𝖾𝗋 𝖺𝖿𝗍𝖾𝗋 𝖼𝗆𝗇𝖽')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['SUDO']: match[1]
            }
        });
        await message.sendMessage("𝗌𝗎𝖽𝗈 𝗎𝗉𝖽𝖺𝗍𝖾𝖽 ✅")
    }));

    Stella.tostella({ pattern: 'caption ?(.*)', fromMe: true, desc: 'changes all captions', usage: '.caption *Made by Raganork*' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝖼𝖺𝗉𝗍𝗂𝗈𝗇 𝖺𝖿𝗍𝖾𝗋 𝖼𝗆𝗇𝖽')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['ALL_CAPTION']: match[1]
            }
        });
        await message.sendMessage("𝖭𝖾𝗐 𝖢𝖺𝗉𝗍𝗂𝗈𝗇 𝖠𝖽𝖽𝖾𝖽 ✅")

    }));


    Stella.tostella({ pattern: 'botname ?(.*)', fromMe: true, desc: 'change your bot name', usage: '.botname *name* ' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('𝖤𝗇𝗍𝖾𝗋 𝖸𝗈𝗎𝗋 𝖡𝗈𝗍 𝗇𝖺𝗆𝖾 𝖺𝖿𝗍𝖾𝗋 𝖼𝗈𝗆𝗆𝖺𝗇𝖽')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['BOT_NAME']: match[1]
            }
        });
        await message.sendMessage("𝖡𝗈𝗍 𝗇𝖺𝗆𝖾 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 ✅")
    }));

Stella.tostella({ pattern: 'callblock ?(.*)', fromMe: true, desc: 'change mode off call block', usage: '.callblock *on/off* ' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('𝖤𝗇𝗍𝖾𝗋 𝖸𝗈𝗎𝗋 on/off 𝖺𝖿𝗍𝖾𝗋 𝖼𝗈𝗆𝗆𝖺𝗇𝖽')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['CALL_BLOCK']: match[1]
            }
        });
        await message.sendMessage("```Call block mode``` 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 ✅")
    }));

    Stella.tostella({ pattern: 'botlogo ?(.*)', fromMe: true, desc: 'change your bot logo', usage: '.botname *name* ' }, (async (message, match) => {
        if (match[1] == '') return await message.sendMessage('𝗉𝗅𝖾𝖺𝗌𝖾 𝖾𝗇𝗍𝖾𝗋 𝗅𝗂𝗇𝗄 🥴')
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                ['LOGO_LINK']: match[1]
            }
        });
        await message.sendMessage("𝖡𝗈𝗍 𝗅𝗈𝗀𝗈 𝖼𝗁𝖺𝗇𝗀𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 ✅")
    }));

Stella.tostella({pattern: 'join', fromMe: true, dontAddCommandList: true}, (async (message, match) => {

const why = "```Sry this is not a valid format```\n\n```format:```\n```.join https://chat.whatsapp.com/xxx```"

  if (match[1] === '') return await message.client.sendMessage(message.jid, why);
  
     
  let id = match[1];
  
 await message.client.acceptInvite(id);
 
  
}))

Stella.tostella({pattern: 'jid', fromMe: true, dontAddCommandList: true}, (async (message, match) => {

var json = await message.client.groupMetadataMinimal(message.jid)

  if (message.jid.includes('-')) { await message.client.sendMessage(message.jid, "```Group jid:```" + `${json.id}` );
 }

}))