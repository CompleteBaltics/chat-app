const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (newMessage) => {
    console.log(newMessage);

    // io.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // })

    socket.broadcast.emit('newUser', generateMessage('Admin', 'New user joined'));
    socket.emit('newUser', generateMessage('Admin', 'Welcome to chat app'));
  });

  socket.on('disconnect', () => {
    console.log('User was disconected');
  });
});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});


console.log(__dirname + '/../public');
console.log(publicPath);
