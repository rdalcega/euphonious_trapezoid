sphero.controller('gameController', ['game', 'socket', 'player', function(game, socket, player) {

  element = document.getElementById("game");
  
  game.playerNum = String(player.playerNum);
  console.log('game.playerNum: ', game.playerNum);

  game.init(element, 20);

  var eventQueue = [];
  setInterval(function( ) {
    var queued = eventQueue.shift( );
    if( queued ) {
      if( queued.event === 'state' ) {
        game.updateBoard( queued.data );
      } else if( queued.event === 'ended' ) {
        game.ended( queued.data );
      }
    }
  }, 100);

  window.addEventListener('resize', function() {
    game.setSize();
  });

  window.addEventListener('mousedown', function (mouseDownEvent) {
    var coordinates = game.getPosition( mouseDownEvent.clientX, mouseDownEvent.clientY );
    var sending = {coordinates: coordinates, state: game.playerNum };
    console.log ( sending );

    socket.emit('insert', {coordinates: coordinates, state: game.playerNum });
  }, false);

  socket.on('state', function (data) {
    console.log( 'updateBoard: ', data);
    eventQueue.push({
      event: 'state',
      data: data
    });
  });



}]);
