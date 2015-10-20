sphero.controller('gameController', function(game, socket) {

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
