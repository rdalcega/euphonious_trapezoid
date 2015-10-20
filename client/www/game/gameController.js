sphero.controller('gameController', function(game) {
  // the gameController requires sockets. we initialize them here
   var socket;
   if (window.__karma__) { 
    // in case we do testing with karma and phantom
     socket = io.connect(window.location.protocol + "//" + window.location.hostname + ":" + 1337);
   } else {
     socket = io.connect();
   }

  var element = document.getElementById('game');

  game.init(element, 2000, 20);

  window.addEventListener('resize', function() {
    game.resize();
  });

  window.addEventListener('mousedown', function (mouseDownEvent) {
    game.getGridPosition(mouseDownEvent, function (position2d) {
      socket.emit('addPiece', position2d);
      console.log('emitted: ', position2d);
    });
  }, false);

  socket.on('addPiece', function (pieceData) {
    game.addPiece(pieceData.x, pieceData.y, pieceData.state);
  })

});
