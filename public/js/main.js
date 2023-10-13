const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();
// gettin user and room from query

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

console.log(username + room);
// socket.emit('joinRoom' , )

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    // scrolling 

    chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    // console.log( msg);
    // emiting message to the server

    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})

// output function 

const outputMessage = (msg) =>{
    // div creat 
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>`
    // attach it  to chat-messages div

    chatMessages.appendChild(div);

}