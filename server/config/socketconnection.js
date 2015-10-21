var socketioJwt = require("socketio-jwt");
var Sphero = require('../Sphero/spheroconnection.js');

module.exports = function(io) {

  // io.use(socketioJwt.authorize({
  //   secret: 'flashing kittens love 25% cotton!',
  //   handshake: true
  // }));

  io.on('connection', function(socket) {
    console.log('a user connected');
    // socket.emit('started');
    // io.emit('started', null, function() {
    //   console.log("I've emitted started");
    // });
  socket.emit('started', function() {
    console.log("I HEARD STARTED");
  });
  socket.on('started', function() {
    console.log("CLIENT EMITTED STARTED");
  })
    Sphero.init(io, socket);
    socket.on('disconnect', function(){
      console.log('a user disconnected');
    });
  });

};
