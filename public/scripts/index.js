var socket = io();

socket.on('connect', function() {
  console.log('Connected');

  socket.on('newMessage', function(message){
    let li = $('<li class="message-item"></li>');
    li.text(`[${convertDate(message.createdAt)}] ${message.from}: ${message.text}`);

    $('#messages').append(li);
  });

  socket.on('newUser', function(message){
    console.log(message);
  });
});

socket.on('disconnect', function() {
  console.log('disconected from server');
});

$('#chat-form').on('submit', function(e){
  socket.emit('createMessage', {
    from: $('#name').val(),
    text: $('#txt').val()
  }, function(msg){
    console.log('Got it', msg);
  });
  e.preventDefault();
});

function convertDate(data) {
    var ConvDate= new Date(data);
    return `${ConvDate.getDate()}/${ConvDate.getMonth()}/${ConvDate.getFullYear()} ${ConvDate.getHours()}:${ConvDate.getMinutes()}:${ConvDate.getSeconds()}`;
}
