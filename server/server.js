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

  socket.on('createMessage', (newMessage, callback) => {
    console.log(newMessage);
    callback('This should be from server');
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
  });

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

  socket.on('createLocationMessage', (pos) => {
    console.log(pos);
    io.emit('newLocationMessage', generateMessage('Admin', `${pos.lat},${pos.lng}`));
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
