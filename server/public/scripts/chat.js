var socket = io.connect('http://localhost:8080');

socket.emit('join', {username: $('#hidden_username').val()});

socket.on('message_all', function(data) {
  insertMessageAll(data.username, data.message);
});

;socket.on('message_private', function(data) {
  insertMessagePrivate(data.username, data.message, false);
});

socket.on('new_client', function(data) {
  $('#messages_zone').prepend('<p><em>'+ data.username + ' joined the chat.</em></p>');
});

socket.on('message_server', function(data) {
  $('#messages_zone').prepend('<p class="server">SERVER: <em>'+ data.message +'</em></p>');
});

$('#form_chat').submit(function () {
  var message = $('#message').val();
  checkCommand(message);
  $('#message').val('').focus();
  return false;
});

var insertMessageAll = function(username, message) {
  var line = '<p><span class="msg-username">';
  line = line + username + '</span>: ';
  line = line + message + '</p>';
  $('#messages_zone').prepend(line);
};

var insertMessagePrivate = function(username, message, isSender) {
  var line;
  if (isSender)
    line = '<p style="color: purple;">To <span class="msg-username">';
  else
    line = '<p style="color: purple;">From <span class="msg-username">';
  line = line + username + '</span>: ';
  line = line + message + '</p>';
  $('#messages_zone').prepend(line);
};


var checkCommand = function(line) {
  var tokens = line.split(' ');
  if (tokens.length > 2 && tokens[0] == "/msg")
    send_private(tokens[1], tokens.slice(2).join(' '));
  else
    send_all(line);
};

var send_all = function(message) {
  var username = $('#hidden_username').val();
  socket.emit('message_all', {username: username, message: message});
  insertMessageAll(username, message);
};

var send_private = function(dest, message) {
  var username = $('#hidden_username').val();
  socket.emit('message_private', {username: username, dest: dest, message: message});
  insertMessagePrivate(dest, message, true);
};
