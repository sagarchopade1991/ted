console.log("socketJS");
var app = require('../../server');
var server = app.server;
var socketIo = require('socket.io')(server);
exports.socketIo = socketIo;

socketIo.on('connection', function(socket) {
    console.log('Socket connected!');
    socket.on('disconnect', function() {
      console.log('Socket disconnected');
    });
  });