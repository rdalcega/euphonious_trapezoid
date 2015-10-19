var socketioJwt = require("socketio-jwt");
//var Sphero = require('sphero-file-path');

module.exports = function(io) {

  io.use(socketioJwt.authorize({
    secret: 'flashing kittens love 25% cotton!',
    handshake: true
  }));

  io.on('connection', function(socket) {
    console.log('a user connected');
    //Sphero.init(io, socket);
    // socket.on('disconnect', function(){
    //   console.log('user disconnected');
    // });
  });

};
