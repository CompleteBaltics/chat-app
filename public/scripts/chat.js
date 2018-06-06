var socket = io();

socket.on('connect', function() {
  socket.emit('join', $.deparam(window.location.search), function(err){
    if (err) {
      alert(err);
      window.location.href = '/';
    }else {

    }
  });
});

socket.on('newMessage', function(message){
  var template = $('#message-template').html();

  var html = Mustache.render(template, {
    text: message.text,
    name: message.from,
    created: message.createdAt,
    createdFormated: convertDate(message.createdAt)
  });
  $('#messages').append(html);
  autoScroll();
});

socket.on('newLocationMessage', function(message){
  var template = $('#location-message-template').html();

  var html = Mustache.render(template, {
    text: `https://google.com/maps?q=${message.text}`,
    name: message.from,
    created: message.createdAt,
    createdFormated: convertDate(message.createdAt)
  });
  $('#messages').append(html);
  autoScroll();
});

socket.on('newUser', function(message){
  console.log(message);
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

socket.on('updateUserList', function(users){
  var $ol = $('<ol></ol>');

  users.forEach(function(userName) {
    $ol.append(`<li>${userName}</li>`);
  });

  $('#users').html($ol);
});
let $txt = $('#txt');
$('#chat-form').on('submit', function(e){
  socket.emit('createMessage', {
    from: 'User',
    text: $txt.val()
  }, function(msg){
    $txt.val('');
    $txt.focus();
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
    $txt.focus();
  }, function(){
    alert('Unable to get position');
    $sg.attr('disabled', false).text('Send location');
    $txt.focus();
  });
});

function convertDate(data) {
  var ConvDate = moment(data).fromNow();
  return ConvDate;
}

function autoScroll(){
  var $messages = $('#messages');
  var $newMessage = $messages.children('li:last-child');
  var newMessageHeight = $newMessage.innerHeight();
  var lastMessageHeight = $newMessage.prev().innerHeight();
  var height = $messages.prop('clientHeight');
  var scrollTop = $messages.prop('scrollTop');
  var scrollHeight = $messages.prop('scrollHeight');

  if (height + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight) {
    $messages.animate({scrollTop: scrollHeight}, 500);
  }
}
