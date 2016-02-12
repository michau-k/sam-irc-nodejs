var socket = io.connect('http://localhost:8080');

socket.on('message', function(data) {
  insertMessage(data.message)
});

socket.on('new_client', function() {
  $('#messages_zone').prepend('<p><em>New user.</em></p>');
});

$('#form_chat').submit(function () {
  var message = $('#message').val();
  socket.emit('message', message);
  insertMessage(message);
  $('#message').val('').focus();
  return false;
});

var insertMessage = function(message) {
  $('#messages_zone').prepend('<p>' + message + '</p>');
};
