var socket = io();

socket.on('connect', function() {
  console.log('Connected');

  socket.on('newMessage', function(message){
    let li = $('<li class="message-item"></li>');
    li.text(`[${convertDate(message.createdAt)}] ${message.from}: ${message.text}`);

    $('#messages').append(li);
  });

  socket.on('newLocationMessage', function(message){
    let li = $('<li class="message-item"></li>');
    li.html(`[${convertDate(message.createdAt)}] ${message.from}: <a href="https://google.com/maps?q=${message.text}" target="_blank">User location</a>`);

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

$('#send-geo').click(function(){
  if (!navigator.geolocation) {
    return alert('No geo');
  }

  navigator.geolocation.getCurrentPosition(function(pos){
    console.log(pos);
    socket.emit('createLocationMessage', {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    });
  }, function(){
    alert('Unable to get position');
  });
});

function convertDate(data) {
    var ConvDate= new Date(data);
    return `${ConvDate.getDate()<10?'0'+ConvDate.getDate():ConvDate.getDate()}/${ConvDate.getMonth()<10?'0'+ConvDate.getMonth():ConvDate.getMonth()}/${ConvDate.getFullYear()} ${ConvDate.getHours()<10?'0'+ConvDate.getHours():ConvDate.getHours()}:${ConvDate.getMinutes()<10?'0'+ConvDate.getMinutes():ConvDate.getMinutes()}:${ConvDate.getSeconds()<10?'0'+ConvDate.getSeconds():ConvDate.getSeconds()}`;
}
