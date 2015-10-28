sphero.controller('gameController', ['$scope', '$state', 'game', 'socket', 'player', 'Auth', function($scope, $state, game, socket, player, Auth) {

  element = document.getElementById("game");

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

    socket.emit('insert', {
      coordinates: coordinates,
      state: game.playerNum
    });
  }, false);

  socket.on('state', function(data) {
    console.log('updateBoard: ', data);
    eventQueue.push({
      event: 'state',
      data: data
    });
  });

  $scope.showPopup = function(playersObj) {
    $scope.endGame = playersObj; // look at what this obj is and extract
    console.log(playersObj);
    //allow player to friend other players
    $scope.friend = function(otherPlayer) {
      Auth.addFriend(otherPlayer, player.profile.id);
    };

    var signupPopUp = $ionicPopup.show({
      templateUrl: '<p>POPUP</p>', //'../endgame/endgame.html',
      title: 'Game Stats',
      scope: $scope,
      buttons: [{
        text: 'Exit',
        type: 'button-clear',
        onTap: function(e) {
          return false;
        }
      }]
    });

    signupPopUp.then(function() {
      signupPopUp.close();
      $state.go('nav');
    });
  };


  socket.on('endgame', function(data) {
    $scope.showPopup(data);
  });

}]);
