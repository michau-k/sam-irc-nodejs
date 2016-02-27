var remote = require('remote');

$('#min-window-btn').click(function() {
  var window = remote.getCurrentWindow();
  window.minimize();
});

$('#close-window-btn').click(function() {
  var window = remote.getCurrentWindow();
  window.close();
});
