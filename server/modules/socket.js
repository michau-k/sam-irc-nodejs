// NPM modules
const socketIO = require('socket.io');
const ent = require('ent');

// local module
const popstring = require('./popstring');

var setUpSockets = function(server) {
  var io = socketIO.listen(server);
  io.sockets.on('connection', function (socket) {
    console.log('New client connected onn its socket [SUCCESS]');

    socket.on('join', function (data) {
      socket.join(data.username);
      socket.broadcast.emit('new_client', data);
      io.sockets.emit('message_all', {username: 'SERVER', message: popstring.getString()});
    });

    socket.on('message_all', function (data) {
      data.message = ent.encode(data.message);
      socket.broadcast.emit('message_all', data);
    });

    socket.on('message_private', function (data) {
      data.message = ent.encode(data.message);
      io.sockets.in(data.dest).emit('message_private', data);
    });

  });
};

exports.setUpSockets = setUpSockets;
