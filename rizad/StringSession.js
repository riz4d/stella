const fs = require('fs');

class StringSession {
    constructor() {
    }

    deCrypt(string = undefined) {
        if ('STELLA_STRING' in process.env && string === undefined) {
            string = process.env.STRING_SESSION;
        } else if (string !== undefined) {
            if (fs.existsSync(string)) {
                string = fs.readFileSync(string, {encoding:'utf8', flag:'r'});
            }
        }
        
        var split = string.split(';;;');
        if (split.length >= 2) {
            return JSON.parse(Buffer.from(split[split.length - 1], 'base64').toString('utf-8'));
        }
    }

    createStringSession(dict) {
        return 'rizad@connect;;;' + Buffer.from(JSON.stringify(dict)).toString('base64');
    }
}

module.exports = StringSession;
