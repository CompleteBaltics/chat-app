var socket = io();

socket.on('connect', function() {
  console.log('Connected');

  socket.on('newMessage', function(message){
    let li = $('<li class="message-item"></li>');
    li.html(`[<span data-time="${message.createdAt}">${convertDate(message.createdAt)}</span>] ${message.from}: ${message.text}`);

    $('#messages').append(li);
  });

  socket.on('newLocationMessage', function(message){
    let li = $('<li class="message-item"></li>');
    li.html(`[<span data-time="${message.createdAt}">${convertDate(message.createdAt)}</span>] ${message.from}: <a href="https://google.com/maps?q=${message.text}" target="_blank">User location</a>`);

    $('#messages').append(li);
  });

  socket.on('newUser', function(message){
    console.log(message);
  });
});

window.setInterval(function(){
  $('.message-item span').each(function(i,e){
    var $item = $(e);
    var now = $item.data('time');
    var date = convertDate(now);
    $item.text(date);
  });
}, 5000);

socket.on('disconnect', function() {
  console.log('disconected from server');
});
let $txt = $('#txt');
$('#chat-form').on('submit', function(e){
  socket.emit('createMessage', {
    from: 'User',
    text: $txt.val()
  }, function(msg){
    $txt.val('');
  });
  e.preventDefault();
});

var $sg = $('#send-geo');

$sg.click(function(){
  if (!navigator.geolocation) {
    return alert('No geo');
  }

  $sg.attr('disabled', 'disabled').text('...');
  navigator.geolocation.getCurrentPosition(function(pos){
    socket.emit('createLocationMessage', {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    });
    $sg.attr('disabled', false).text('Send location');
  }, function(){
    alert('Unable to get position');
    $sg.attr('disabled', false).text('Send location');
  });
});

function convertDate(data) {
  var ConvDate = moment(data).fromNow();
  return ConvDate;
}
