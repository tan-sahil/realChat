const express = require("express");
const path = require('path');
const http = require('http');
const app = express();
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
const PORT = 3000 || process.env.PORT;
app.use(express.static(path.join(__dirname, 'public')))

// run whenever client connect 

io.on('connection', socket => {
    console.log(`listenig on WS ${socket}`);
    socket.emit('message', "wlcome to chatbox")

    // emit message when user connects:; 
    socket.broadcast.emit('message', 'user has connected to chatroom');

    // message whwn user disconnect  
    socket.on('disconnect' , () => {
        io.emit('message', 'user has disconnected');
    })
    // lstennig to chatMsg 
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    })
})

server.listen(PORT , () => console.log(`listning on the port ${PORT}`));
