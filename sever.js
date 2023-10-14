const express = require("express");
const path = require('path');
const http = require('http');
require('dotenv').config();
const app = express();
const connectDB = require('./db/db');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
const PORT =  process.env.PORT;
const {saveUser, getUser} = require('./utils/userFunctions');
const User = require('./models/usersModel');
const getMessage = require('./utils/messages');
connectDB();
app.use(express.static(path.join(__dirname, 'public')))

// run whenever client connect 

io.on('connection', socket => {

    // listening for the room 
    socket.on('joinRoom' , ({username, room}) =>{
        
        // getttin user and saving it:: 
        //  saveUser(username, room).then(data => console.log(data));
        User.create({
            username,
            room
        }).then(data =>{
            if(data){
                socket.join(data.room);
                let botName = "ChatBot"
                // console.log(`listenig on WS ${socket.data}`);
                socket.emit('message', getMessage(botName, "welcome to chatbox"))
            
                // emit message when user connects:; 
                botName  = data.username
                socket.broadcast.to(data.room).emit('message',
                 getMessage(botName, 'user has connected to chatroom'));
                console.log(botName);
            }else{
                console.log('uerror while saving');
            }
        })
        .catch(err => console.log(err));
        
        
        // user = userJoin()
    })
   
   

    // message whwn user disconnect  
    socket.on('disconnect' , () => {
        io.emit('message', 'user has disconnected');
    })
    // lstennig to chatMsg 
    socket.on('chatMessage', msg => {
        io.emit('message', getMessage("user", msg));
    })
})

server.listen(PORT , () => console.log(`listning on the port ${PORT}`));
