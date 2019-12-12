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
        socket.join(user)
    });
   
    socket.on('disconnect', () => {
        console.log('User had left!!');
    })
});

app.use(router)
server.listen(PORT, () =>{
    console.log(`Server listening on port  ${PORT}`);
});


