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
    activeUsers[socket.id] = "something";
    console.log("activeUsers are ", activeUsers);
    console.log("the socket is ", socket);
    Sphero.init(io, socket);
    socket.on('disconnect', function(){
      console.log('a user disconnected');
    });
  });

};
