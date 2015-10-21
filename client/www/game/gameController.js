sphero.controller('gameController', function(game, socket) {

  var element = document.getElementById('game');
  
  var playerNum = 1;

  game.init(element, playerNum, 2000, 20);

  window.addEventListener('resize', function() {
    game.resize();
  });

  window.addEventListener('mousedown', function (mouseDownEvent) {
    game.getGridPosition(mouseDownEvent, function (position2d) {
      socket.emit('insert', {coordinates: position2d, state:playerNum }, function () {
        console.log('emitted: ', {coordinates: position2d, state:playerNum });
      } );
    });
  }, false);

  socket.on('put', function (data) {
    if (data.success) {
      game.addPiece(data.x, data.y, data.state);
    }
  });

});
