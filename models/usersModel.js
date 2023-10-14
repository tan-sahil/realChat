
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username:{
        type : "String",
        required: [true, 'please provide username'],
    },
    room: {
        type : "String",
        required : true
    }
})

module.exports = mongoose.model('User', userSchema);