sphero.controller('hostController', ['$scope', '$state', 'socket', 'player', 
	function($scope, $state, socket, player) {

	$scope.activeUsers = {};
	$scope.activeGame = null;

	$scope.host = function() {

		socket.emit('host', player.profile);

	};

	$scope.invite = function(user) {
		socket.emit('invite', 
	}

  socket.on('started', function(data) {
    player.playerNum = String(data.playerNum);
    $state.go('profile.game');
  });

  socket.on('hosting', function(data) {

  	$scope.activeGame = data;
  	console.log($scope.activeGame);
  });

  socket.on('updateUsers', function(data) {
  	console.log(data);
  	$scope.activeUsers = data;

  });

}]);