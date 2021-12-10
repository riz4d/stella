const Rizad = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

Rizad.tostella({pattern: 'love', fromMe: true}, (async (message, match) => {

    await message.sendMessage("🍫 Luvv Yuh Too");
    
    await new Promise(r => setTimeout(r, 1500));

    await message.sendMessage("\n Did you already have Any Crush ? ");

}));

Rizad.tostella({pattern: 'infolove', fromMe: true}, (async (message, match) => {

    await message.sendMessage("Codded by *@riz4d*\n A entertaining animation of love :)\n💻Usage: *.love*")

}));
