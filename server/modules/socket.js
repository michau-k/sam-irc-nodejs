// NPM modules
const socketIO = require('socket.io');
const ent = require('ent');

var setUpSockets = function(server) {
  var io = socketIO.listen(server);
  io.sockets.on('connection', function (socket) {
    console.log('New client connected on its socket [SUCCESS]');
    socket.broadcast.emit('new_client');
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {message: message});
    });

  });
};

exports.setUpSockets = setUpSockets;
