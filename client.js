const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messageInput = document.getElementById('messageinp')
const messagecontainer = document.querySelector(".container")

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.Value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})
const name = prompt("enter you name to join ");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
  append(`${name} joined the chat`,'right')
})
socket.on('receive', data =>{
    append(`${data.name}:${data.message}`,'left')
})
