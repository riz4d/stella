/*
# Copyright (C) 2021 Mohamed rizad
*/

function successfullMessage(msg) {
    return "✅ *STELLA*:  ```" + msg + "```"
}
function errorMessage(msg) {
    return "🛑 *STELLA*:  ```" + msg + "```"
}
function infoMessage(msg) {
    return "⏺️ *STELLA*:  ```" + msg + "```"
}


module.exports = {
    successfullMessage,
    errorMessage,
    infoMessage
}
