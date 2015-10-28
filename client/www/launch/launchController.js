sphero.controller('launchController', ['$scope', '$state', 'socket', 'player', function($scope, $state, socket, player) {

	$scope.join = function() {

		socket.emit('join', player.profile);

	}

	$scope.host = function() {
    console.log("Player profile on client is ",player.profile);
		socket.emit('host', player.profile);

	}

  socket.on('started', function(data) {
    player.playerNum = String(data.playerNum);
    $state.go('profile.game');
  });

}]);