var socket = io();

socket.on('connect', function() {
  console.log('Connected');

  socket.emit('createMessage', {
    from: 'ok',
    text: 'DASASFASFDASF'
  });

  socket.on('newMessage', function(message){
    console.log(message);
  });

  socket.on('newUser', function(message){
    console.log(message);
  });
});

socket.on('disconnect', function() {
  console.log('disconected from server');
});
