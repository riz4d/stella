const { Sequelize } = require('sequelize');
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
 OB_NAME: process.env.Z_BOT_NAME === undefined ? 'Stella' : process.env.Z_BOT_NAME,
 OWN: process.env.OWNER_MESSAGE === undefined ? 'YES IAM THE OWNER' : process.env.OWNER_MESSAGE,
 SONGD: process.env.SONGD === undefined ? 'ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ꜱᴏɴɢ' : process.env.SONGD,
 SONGU: process.env.SONGU === undefined ? 'ᴜᴘʟᴏᴀᴅɪɴɢ ꜱᴏɴɢ' : process.env.SONGU,
 DESC: process.env.BOT_DESCRIPTION === undefined ? '💥 𝐏𝐄𝐖𝐄𝐑 𝐈𝐒 𝐏𝐄𝐖𝐄𝐑 💥' : process.env.BOT_DESCRIPTION,
 REMOVE2: process.env.THERI_KICK_PM === undefined ? 'false' : process.env.THERI_KICK_PM,
 PM_BLOCK: process.env.PM_BLOCK === undefined ? 'false' : process.env.PM_BLOCK,
 THERI_BLOCK: process.env.THERI_BLOCK === undefined ? 'false' : process.env.THERI_BLOCK,
 LOGO: process.env.LOGO_LINK === undefined ? 'https://github.com/riz4d/stella/blob/main/stella-req/stella.jpg' : process.env.LOGO_LINK,
 PLKAFN: process.env.THERI_LIST_PM === undefined ? false : process.env.THERI_LIST_PM,
 PHONE: process.env.NUMBER === undefined ? '+994 40 350 13 40' : process.env.NUMBER,   
    

};
