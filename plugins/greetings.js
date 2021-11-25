/* Copyright (C) 2021 Mohamed Rizad
*/

const Stella = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const sql = require('./sql/greetings');

const Language = require('../language');
const Lang = Language.getString('greetings');
const adLang = Language.getString('admin');

//============================== check admin =============================================
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {
        if (member.jid.split('@')[0] === user.split('@')[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}

async function checkAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {
        
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}


Stella.addCommand({pattern: 'welcome$', fromMe: false, desc: Lang.WELCOME_DESC}, (async (message, match) => {
    var im = await checkImAdmin(message);
    var userad = await checkAdmin(message);
    if (!userad) return await message.client.sendMessage(message.jid,adLang.USER_NOT_ADMIN,MessageType.text);
    if (!im) return await message.client.sendMessage(message.jid,adLang.IM_NOT_ADMIN,MessageType.text);

    var hg = await sql.getMessage(message.jid);
    if (hg === false) {
        await message.client.sendMessage(message.jid,Lang.NOT_SET_WELCOME,MessageType.text);
    } else {
        await message.client.sendMessage(message.jid,Lang.WELCOME_ALREADY_SETTED + hg.message + '```',MessageType.text);
    }
}));

Stella.addCommand({pattern: 'welcome (.*)', fromMe: false, dontAddCommandList: true}, (async (message, match) => {
    var im = await checkImAdmin(message);
    var userad = await checkAdmin(message);
    if (!userad) return await message.client.sendMessage(message.jid,adLang.USER_NOT_ADMIN,MessageType.text);
    if (!im) return await message.client.sendMessage(message.jid,adLang.IM_NOT_ADMIN,MessageType.text);

    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,Lang.NEED_WELCOME_TEXT);
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,Lang.WELCOME_DELETED,MessageType.text); return await sql.deleteMessage(message.jid, 'welcome'); }
        await sql.setMessage(message.jid, 'welcome', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,Lang.WELCOME_SETTED,MessageType.text)
    }
}));

Stella.addCommand({pattern: 'goodbye$', fromMe: false, desc: Lang.GOODBYE_DESC}, (async (message, match) => {
    var im = await checkImAdmin(message);
    var userad = await checkAdmin(message);
    if (!userad) return await message.client.sendMessage(message.jid,adLang.USER_NOT_ADMIN,MessageType.text);
    if (!im) return await message.client.sendMessage(message.jid,adLang.IM_NOT_ADMIN,MessageType.text);

    var hg = await sql.getMessage(message.jid, 'goodbye');
    if (hg === false) {
        await message.client.sendMessage(message.jid,Lang.NOT_SET_GOODBYE,MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.GOODBYE_ALREADY_SETTED + hg.message + '```',MessageType.text);
    }
}));

Stella.addCommand({pattern: 'goodbye (.*)', fromMe: false, dontAddCommandList: true}, (async (message, match) => {
    var im = await checkImAdmin(message);
    var userad = await checkAdmin(message);
    if (!userad) return await message.client.sendMessage(message.jid,adLang.USER_NOT_ADMIN,MessageType.text);
    if (!im) return await message.client.sendMessage(message.jid,adLang.IM_NOT_ADMIN,MessageType.text);

    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,Lang.NEED_GOODBYE_TEXT,MessageType.text);
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,Lang.GOODBYE_DELETED,MessageType.text); return await sql.deleteMessage(message.jid, 'goodbye'); }
        await sql.setMessage(message.jid, 'goodbye', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,Lang.GOODBYE_SETTED,MessageType.text)
    }
}));
