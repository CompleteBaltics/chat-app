const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (newMessage, callback) => {
    let user = users.getUser(socket.id);
    if (user && isRealString(newMessage.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }else{
      socket.emit('newMessage', generateMessage('Admin', 'Message Body empty'));
    }

    callback();
  });

  socket.on('createLocationMessage', (pos) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateMessage(user.name, `${pos.lat},${pos.lng}`));
    }

  });

  socket.on('disconnect', () => {
    console.log('User was disconected');
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });

  socket.on('join', function (params, callback) {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Check room or diplay name');
    }
    socket.join(params.room);
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    socket.emit('newMessage', generateMessage('Admin', `Hi ${params.name}, welcome to chat app`));

    let userInfo = {
      id: socket.id,
      name: params.name,
      room: params.room
    };
    users.addUser(userInfo);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    callback();
  });


});

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});


console.log(__dirname + '/../public');
console.log(publicPath);
