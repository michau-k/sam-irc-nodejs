// NPM modules
const cluster = require ('cluster');

cluster.setupMaster({
    exec: './clusters/popstring-app.js',
    silent: false
  });

var launch = function(room) {
  var worker = cluster.fork();

  console.log('Fork [SUCCESS]');
  worker.on('message', function(data) {
    if (data.message) {
      console.log('Worker to master: ', data.message, '[SUCCESS]');
      room.emit('message_server', {message: data.message});
    }
  });
};

module.exports.launch = launch;
