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
  console.log("DATA RECEIVED FROM EVENT ", data);
  playersInRoom[gameId] = [];
  playersInRoom[gameId].push(data);
  console.log(playersInRoom);
};
var join = function(io, data) {
    if (gameQueue[0]) { 
      this.join(gameQueue[0])
      console.log("gameQueue AFTER JOIN IS " + gameQueue);
      console.log("I THINK THIS IS AN OBJECT " + Object.keys(io.nsps['/'].adapter.rooms[gameQueue[0]]));
      if(Object.keys(io.nsps['/'].adapter.rooms[gameQueue[0]]).length === 2) {
        startGame(gameQueue.shift(), io);
      }
    } else { 
      host.call(this);
    }
};
var single = function(io) {
  var gameId = ((Math.random() * 100000) || 0).toString();
  this.join(gameId);
  console.log("single player game created at " + gameId);
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
  var events = ['put', 'removed', 'moved', 'rotated', 'fell', 'suspended', 'state', 'ended'];
  for (i = 0; i < events.length; i++) {
    game.on(events[i], function(event) {
      io.to(gameId).emit(this, event);
    }.bind(events[i]));
  }
  var intervalID = setInterval( function( ) {
    if( !io.nsps['/'].adapter.rooms[gameId] ) {
      delete game;
      clearInterval( intervalID );
    }
  }, 10000 );
  
  game.on('ended', function() {
    delete game;
    clearInterval( intervalID );
  });
  
  console.log("ALL LISTENERS ATTACHED");
};
module.exports.init = function(io, socket) {
  socket.on('host', function(data){
    console.log("data on event host is: " + data);
    host.bind(socket, io, data);
  });
  socket.on('join', function(data) {
    join.bind(socket, io, data);
  });
  socket.on('single', single.bind(socket, io));
};