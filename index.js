
const { Socket } = require("socket.io");
//node server which will handel socket io connections
const io=require('Socket.io')(8000)

const user={};
io.on('connection',socket=>{
    socket.on('new-user-joined', name =>{
       user[socket.id]=name;
       socket.broadcast.emit('user-joined',name)
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: user[socket.id]})
    });
})