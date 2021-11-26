

function successfullMessage(msg) {
    return "✅ *Stella*:  ```" + msg + "```"
}
function errorMessage(msg) {
    return "🛑 *Stella*:  ```" + msg + "```"
}
function infoMessage(msg) {
    return "⏺️ *Stella*:  ```" + msg + "```"
}


module.exports = {
    successfullMessage,
    errorMessage,
    infoMessage
}
