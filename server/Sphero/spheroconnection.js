// hook into core game logic
var Game = require('../game/game.js');

var gameQueue = [];
var playersInRoom = {};
var activeUsers = {};

var invite = function(io, data) {

  io.to(data.socketID).emit('invite', {gameID: data.gameID, host: data.host);

};

var privateGame = function(io, data) {

  var gameId = ((Math.random() * 100000) || 0).toString();

  activeUsers[this.id].profile = data;

  io.to(this.id).emit('hosting', gameId);
  console.log("socket ID is! ", this.id);
  startGame(gameId, io);

};

var joinPrivate = function(io, data) {

  console.log("is join private working?");

  this.join(data.gameID);

  activeUsers[this.id].joined = true;

  playersInRoom[]

};

var grabProfile = function(io, data) {

  if (activeUsers[this.id]) {
    activeUsers[this.id] = { profile: data, joined: false };
    console.log("active user profile is ", activeUsers);
  };

};

var host = function(io, data) {
  // Create a unique Socket.IO Room
  if (!activeUsers[this.id].joined) {
    var gameId = ((Math.random() * 100000) || 0).toString();
    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    // Join the Room and wait for the players
    activeUsers[this.id].profile = data;
    activeUsers[this.id].joined = true;

    console.log(activeUsers[this.id]);
    this.join(gameId);

    // io.sockets.socket(this.id).emit('hosting', gameId);
    gameQueue.push(gameId);


    console.log("DATA RECEIVED FROM HOST EVENT ", data);

    playersInRoom[gameId] = [];
    playersInRoom[gameId].push([data, data.userName]);
    console.log(playersInRoom);
  }

};

var join = function(io, data) {
  if (!activeUsers[this.id].joined) {
    if (gameQueue[0]) {
      activeUsers[this.id].joined = true;
      this.join(gameQueue[0]);

      playersInRoom[gameQueue[0]] = playersInRoom[gameQueue[0]] || [];

      playersInRoom[gameQueue[0]].push([data, data.userName]);

      console.log("Players in room at ", gameQueue[0], " are ", playersInRoom[gameQueue[0]]);
      if(Object.keys(io.nsps['/'].adapter.rooms[gameQueue[0]]).length === 2) {
        startGame(gameQueue.shift(), io);
      }
    } else {
      host.call(this, io, data);
    }
  }
};
var single = function(io, data) {
  var gameId = ((Math.random() * 100000) || 0).toString();
  this.join(gameId);
  playersInRoom[gameId] = [];
  playersInRoom[gameId].push([data, data.userName]);
  console.log("data from single event is " + data);
  console.log(playersInRoom);
  startGame(gameId, io);
};
var startGame = function(gameId, io) {
  var sockets = Object.keys(io.nsps['/'].adapter.rooms[gameId]).map(function(socketId) {
    return io.sockets.connected[socketId];
  });
  var players = [];
  for (var i = 0; i < sockets.length; i++) {
    players.push(String(i));
  };
  console.log("The players are!! ", players);
  var game = new Game();

  console.log("GAME MADE - IT IS " + game);

  if (players.length > 1) {
    var alreadyPlayed = false;

    var intervalID2 = setInterval( function() {
      players.push(players.shift());
      io.to(gameId).emit('turnEnded', { players: players, duration: 1000} );
      alreadyPlayed = false;
    }, 1000);
  }

  for (var i = 0; i < sockets.length; i++) {
    var socket = sockets[i];

    socket.on('insert', function(event) {
      if (players.length > 1) {
        if (event.state === players[0] && !alreadyPlayed) {
          alreadyPlayed = true;
          game.insert(event);
        }
      } else {
        game.insert(event);
      }
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
      clearInterval( intervalID2 );
    }
  }, 10000 );

  game.on('ended', function() {
    var rank = game.rank();
    var playerRank = [];
    rank.forEach(function(player, index) {
      if (playersInRoom[gameId][player]) {
        playerRank.push(playersInRoom[gameId][player][0]);
      }
    });
    io.to(gameId).emit('ended', playerRank);
    console.log("player Rank array is ", playerRank);
    delete playersInRoom[gameId];
    game = null;
    clearInterval( intervalID );
    clearInterval( intervalID2 );
  });

  console.log("ALL LISTENERS ATTACHED");
};

module.exports.init = function(io, socket) {

  activeUsers[socket.id] = true;

  socket.on('host', function(data){
    host.call(socket, io, data);
  });
  socket.on('join', function(data) {
    join.call(socket, io, data);
  });
  socket.on('single', function(data) {
    single.call(socket, io, data);
  });
  socket.on('privateGame', function(data) {
    privateGame.call(socket, io, data);
  });
  socket.on('invite', function(data) {
    invite.call(socket, io, data);
  });

  socket.on('grabProfile', function(data) {
    grabProfile.call(socket, io, data);
    io.emit('updateUsers', activeUsers);
  });
  socket.on('checkForUsers', function() {
    io.emit('updateUsers', activeUsers);
  });


  socket.on('disconnect', function(){
    delete activeUsers[this.id];
    io.emit('updateUsers', activeUsers);

    console.log('socket id in activeUsers is ', activeUsers[this.id], ' and activeUsers is ', activeUsers);
    console.log('a user disconnected');
  });

};
