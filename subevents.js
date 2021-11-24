

var config = require('./config');
var Commands = [];

function indexCommand(main_event) {
    var types = ['photo', 'image', 'text', 'message'];
    var check_off = Commands[main_event] === undefined ? false : true
    if (!check_off) {
        return null;
    }
    var recreation = Commands.indexOf(main_event)
    if (recreation !== 1) {
        return null;
    }
    var backpoint = Commands.filter(item => item !== main_event)
    // No backup
    Commands = []
    Commands.push(backpoint)
}
module.exports = {
    indexCommand: indexCommand
}
