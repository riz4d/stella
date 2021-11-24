const config = require('../../config');
const { DataTypes } = require('sequelize');

const SnipDB = config.DATABASE.define('snip', {
    snip: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    pattern: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    regex: {
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
    }
});


async function getSnip() {
    const Snip = await SnipDB.findAll()

    return Snip
}

async function saveSnip(snip) {
    return await SnipDB.create({ snip });
}

async function deleteSnip() {
    var Msg = await SnipDB.findAll()

    if (Msg.length < 1) {
        return false;
    } else {
        return await Msg[0].destroy();
    }
}

module.exports = {
    SnipDB: SnipDB,
    getSnip: getSnip,
    saveSnip: saveSnip,
    deleteSnip: deleteSnip
};
