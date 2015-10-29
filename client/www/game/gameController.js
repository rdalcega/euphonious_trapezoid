sphero.controller('gameController', ['$scope', '$state', 'game', 'socket', 'player', 'Auth', '$ionicPopup', function($scope, $state, game, socket, player, Auth, $ionicPopup) {

  element = document.getElementById("game");

  var gameEnded = false;

  game.playerNum = String(player.playerNum);
  console.log('game.playerNum: ', game.playerNum);

  game.init(element, 20);

  var eventQueue = [];
  setInterval(function() {
    var queued = eventQueue.shift();
    if (queued) {
      if (queued.event === 'state') {
        game.updateBoard(queued.data);
      } else if (queued.event === 'ended') {
        game.ended(queued.data);
      }
    }
  }, 100);

  window.addEventListener('resize', function() {
    game.setSize();
  });

  window.addEventListener('mousedown', function(mouseDownEvent) {
    var coordinates = game.getPosition(mouseDownEvent.clientX, mouseDownEvent.clientY);
    var sending = {
      coordinates: coordinates,
      state: game.playerNum
    };
    console.log(sending);
    if (!gameEnded) {
      socket.emit('insert', {
        coordinates: coordinates,
        state: game.playerNum
      });
    }
  }, false);

  socket.on('state', function(data) {
    console.log('updateBoard: ', data);
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
    $scope.showPopup(data);
  });

}]);
