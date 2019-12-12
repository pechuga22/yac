const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const router = require('./routes/router');
const {addUser, removeUser, getUser}= require('./controllers/users');
const io = socketio(server);
io.on('connection', (socket) => {
    
    socket.on('join' , ({username}, callback) => {
        const { error, user} = addUser({id: socket.id, username});

        if(error) return callback(error);
        socket.emit('message', { user:'admin', text:`${user.username}, join to chat`});
        
        socket.join(user);
        callback();
    });
    socket.on('sendMessage', (message,callback) => {
        const user = getUser(socket.id);
        io.to(user).emit('message',{user:user.username, text: message});

        callback();
    });
   
    socket.on('disconnect', () => {
        console.log('User had left!!');
    });
});

app.use(router)
server.listen(PORT, () =>{
    console.log(`Server listening on port  ${PORT}`);
});


