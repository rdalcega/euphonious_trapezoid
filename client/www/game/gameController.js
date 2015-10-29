sphero.controller('gameController', ['$scope', '$state', 'game', 'socket', 'player', 'Auth', '$ionicPopup', 
  function($scope, $state, game, socket, player, Auth, $ionicPopup) {

  element = document.getElementById("game");

  var gameEnded = false;

  game.playerNum = String(player.playerNum);

  console.log('game.playerNum: ', game.playerNum);

  game.init(element, 20);
  var gameEnded = false;

  var eventQueue = [];
  var checkQueue = function () {
    var queued = eventQueue.shift( );
    if( queued ) {
      if( queued.event === 'state' ) {
        game.updateBoard( queued.data );
        setTimeout( checkQueue, 0);
      } else if( queued.event === 'ended' ) {
        game.ended( queued.data );
      } else if ( queued.event === 'put' ) {
        setTimeout( checkQueue, game.put( queued.data ) );
      } else if ( queued.event === 'removed' ) {
        setTimeout( checkQueue, game.removed( queued.data) );
      } else if ( queued.event === 'moved') {
        setTimeout( checkQueue, game.moved( queued.data ) );
      } else if ( queued.event === 'suspended') {
        setTimeout( checkQueue, game.suspended( queued.data ));
      } else if ( queued.event === 'rotated' ) {
        setTimeout( checkQueue, game.rotated( queued.data ));
      } else if ( queued.event === 'fell' ) {
        setTimeout( checkQueue, game.fell( queued.data ));
      }
    } else {
      setTimeout( checkQueue, 0)
    }
  };

  checkQueue();

  window.addEventListener('resize', function() {
    game.setSize();
  });

  document.getElementById("game").addEventListener('mousedown', function (mouseDownEvent) {
    var coordinates = game.getPosition( mouseDownEvent.clientX, mouseDownEvent.clientY );
    var sending = {coordinates: coordinates, state: game.playerNum };

    if (!gameEnded) {
      socket.emit('insert', {
        coordinates: coordinates,
        state: game.playerNum
      });
    }
  }, false);

// listener for testing solo games, remove in production
  window.addEventListener('keydown', function (keyDownEvent) {
    console.log("keyDownEvent.keyCode: ", keyDownEvent.keyCode)
    if (keyDownEvent.keyCode === 16) {
      game.playerNum = game.playerNum === "0" ? game.playerNum = "1" : game.playerNum = "0" ;
      console.log(game.playerNum);
    }
  });

  socket.on('state', function (data) {
    console.log( 'updateBoard: ', data);
    eventQueue.push({
      event: 'state',
      data: data
    });
  });

  $scope.showPopup = function(playersArray) {
    $scope.endGame = []; // look at what this obj is and extract
    console.log('in popup ==============', playersArray); 
    $scope.me = null;
    $scope.place = null;
    $scope.placeObj = {'1': '1st', '2': '2nd', '3': '3rd', '4': '4th'};
    // an array with players profiles in order of their rank for current game
    for(var i = 0; i < playersArray.length; i++){
      if(playersArray[i]){
        $scope.endGame.push(playersArray[i]);
        if(playersArray[i].username === player.profile.username){
          me = playersArray[i];
          place = i;
        }
      }
    }
    //allow player to friend other players
    $scope.friend = function(otherPlayer) {
      Auth.addFriend(otherPlayer, player.profile.id);
    };

    var signupPopUp = $ionicPopup.show({
      templateUrl: '../endgame/endgame.html',
      title: 'Game Stats',
      scope: $scope,
      buttons: [{
        text: 'Exit',
        type: 'button-clear',
        onTap: function(e) {
          return true;
        }
      }]
    });

    signupPopUp.then(function() {
      signupPopUp.close();
      $state.go('nav');
    });
  };

  socket.on('ended', function(data) {
    gameEnded = true;
    window.removeEventListener('resize');
    window.removeEventListener('mousedown');
    $scope.showPopup(data);


  socket.on('put', function (data) {
    eventQueue.push( {
      event: 'put',
      data: data
    });
  });

  socket.on('removed', function (data) {
    eventQueue.push({
      event: 'removed',
      data: data
    });
  });

  socket.on('moved', function (data) {
    eventQueue.push( {
      event: 'moved',
      data: data
    });
  });

  socket.on('suspended', function (data) {
    console.log( data.id + " suspended");
    eventQueue.push( {
      event: 'suspended',
      data: data
    });
  });

  socket.on('rotated', function (data) {
    eventQueue.push( {
      event: 'rotated',
      data: data
    });
  });

  socket.on('fell', function (data) {
    console.log( data.id + " fell");
    eventQueue.push( {
      event: 'fell',
      data: data
    });
  });

}]);
