var remote = require('remote');

$('#min-window-btn').click(function() {
  var window = remote.getCurrentWindow();
  window.minimize();
});

$('#max-window-btn').click(function() {
  var window = remote.getCurrentWindow();
  window.maximize();
});

$('#close-window-btn').click(function() {
  var window = remote.getCurrentWindow();
  window.close();
});
