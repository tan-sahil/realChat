
// create message into an object before showing it to client/ server
const moment = require('moment');
function getMessage(username, text){
    return( {
        username,
        text,
        time : moment().format('h:mm a')
    })
}

module.exports = getMessage;