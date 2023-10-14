
// saving user

const User = require('../models/usersModel');

const saveUser = async (username, room) =>{
    try{
        let user = await User.create({
            username,
            room
        });
        return user;
    }catch(err) {
        console.log(err.message);
    } 
}

const getUser = async (id) => {
    try{
        return await User.findOne({id});
    }catch(err) {
        console.log(err.message);
    }
}

module.exports = {
    saveUser, getUser
}