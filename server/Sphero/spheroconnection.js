// hook into core game logic

module.exports.init = function(io, game) {
  //game.emit('connected', can emit when connected to game)

  //Game Events ==========
  
  //host events
  game.on('hostCreateNewGame', module.exports.hostCreateNewGame);

  //other events
};

//Host Methods

module.exports.hostCreateNewGame = function() {
  // Create a unique Socket.IO Room
  var thisGameId = (Math.random() * 100000) || 0;
  // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
  this.emit('newGameCreated', {
    gameId: thisGameId,
    mySocketId: this.id
  });
  // Join the Room and wait for the players
  this.join(thisGameId.toString());
};
