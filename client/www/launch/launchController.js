sphero.controller('launchController', ['$scope', '$state', 'socket','player', function($scope, $state, socket, player) {

	$scope.join = function() {

		socket.emit('join');

	}

	$scope.host = function() {

		socket.emit('host');

	}

  socket.on('started', function(data) {
    $state.go('game');
    player.playerNum = data.playerNum;
  });

}]);