// hook into core game logic
var Game = require('../game/game.js');

var gameQueue = [];
var playersInRoom = {};

var host = function(io, data) {
  // Create a unique Socket.IO Room
  var gameId = ((Math.random() * 100000) || 0).toString();
  // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
  // Join the Room and wait for the players
  this.join(gameId);
  gameQueue.push(gameId);
  console.log("DATA RECEIVED FROM HOST EVENT ", data);
  playersInRoom[gameId] = [];
  playersInRoom[gameId].push(data);
  console.log(playersInRoom);
};
var join = function(io, data) {
    if (gameQueue[0]) { 
      this.join(gameQueue[0])
      playersInRoom[gameQueue[0]] = playersInRoom[gameQueue[0]] || [];
      playersInRoom[gameQueue[0]].push(data);
      console.log("Players in room at ", gameQueue[0], " are ", playersInRoom[gameQueue[0]]);
      if(Object.keys(io.nsps['/'].adapter.rooms[gameQueue[0]]).length === 4) {
        startGame(gameQueue.shift(), io);
      }
    } else { 
      host.call(this, io, data);
    }
};
var single = function(io, data) {
  var gameId = ((Math.random() * 100000) || 0).toString();
  this.join(gameId);
  playersInRoom[gameId] = [];
  playersInRoom[gameId].push(data);
  console.log("data from single event is " + data);
  console.log(playersInRoom);
  startGame(gameId, io);
};
var startGame = function(gameId, io) {
  var sockets = Object.keys(io.nsps['/'].adapter.rooms[gameId]).map(function(socketId) {
    return io.sockets.connected[socketId];
  });
  var game = new Game();
  console.log("GAME MADE - IT IS " + game);
  for (var i = 0; i < sockets.length; i++) {
    var socket = sockets[i];
    socket.on('insert', function(event) {
      game.insert(event);
    });
    socket.emit('started', {playerNum: i});
    socket.emit('state', game.getState());
  }
  var events = ['put', 'removed', 'moved', 'rotated', 'fell', 'suspended', 'state'];
  for (i = 0; i < events.length; i++) {
    game.on(events[i], function(event) {
      io.to(gameId).emit(this, event);
    }.bind(events[i]));
  }
  var intervalID = setInterval( function( ) {
    if( !io.nsps['/'].adapter.rooms[gameId] ) {
      delete playersInRoom[gameId];
      game = null;
      clearInterval( intervalID );
    }
  }, 10000 );
  
  game.on('ended', function() {
    var rank = game.rank();
    var playerRank = [];
    rank.forEach(function(player, index) {
      playerRank.push(playersInRoom[gameId][player]);
    });
    io.to(gameId).emit('ended', playerRank);
    console.log(playerRank);
    delete playersInRoom[gameId];
    game = null;
    clearInterval( intervalID );
  });
  
  console.log("ALL LISTENERS ATTACHED");
};
module.exports.init = function(io, socket) {
  socket.on('host', function(data){
    host.call(socket, io, data);
  });
  socket.on('join', function(data) {
    join.call(socket, io, data);
  });
  socket.on('single', function(data) {
    single.call(socket, io, data);
  });
};