
const chalk = require('chalk');
const {WAConnection, MessageOptions, MessageType, Mimetype} = require('@adiwajshing/baileys');
const {StringSession} = require('./rizad/');
const fs = require('fs');

async function rizadmuhammed () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.version = [3, 3234, 9]
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 50000;

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('stella')}${chalk.blue.bold('Wa')}
${chalk.white.italic('stella string')}
${chalk.blue.italic('Connecting to Whatsapp...Wait some time.')}`);
    });
    conn.on('open', async () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold(conn.user.jid.startsWith('1') || conn.user.jid.startsWith('994') ? 'stella String API: ' : 'stella String API: '), st
        );

        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `STELLA_STRING="${st}"`);
        }
        console.log(conn.user.jid.startsWith('90') || conn.user.jid.startsWith('994') ? 'Dont Share This Code to Anyone ' + conn.user.name : 'Dont Share This Code to Anyone ' + conn.user.name)
        process.exit(0);
    });
    await conn.connect();
}
rizadmuhammed()
