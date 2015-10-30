var socketioJwt = require("socketio-jwt");
var Sphero = require('../Sphero/spheroconnection.js');

module.exports = function(io) {

  // io.use(socketioJwt.authorize({
  //   secret: 'flashing kittens love 25% cotton!',
  //   handshake: true
  // }));

  var activeUsers = {};

  io.on('connection', function(socket) {
    console.log('a user connected');
    activeUsers[socket.id] = true;
    Sphero.init(io, socket);
    socket.on('disconnect', function(){
      delete activeUsers[this.id];
      console.log('a user disconnected');
    });
  });

};
