//var Sphero = require('sphero-file-path');

module.exports = function(io) {

  io.on('connection', function(socket) {
    console.log('a user connected');
    //Sphero.init(io, socket);
    // socket.on('disconnect', function(){
    //   console.log('user disconnected');
    // });
  });

};
