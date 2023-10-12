const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

socket.on('message', message => {
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
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${msg}
    </p>`
    // attach it  to chat-messages div

    chatMessages.appendChild(div);

}