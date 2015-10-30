sphero.controller('launchController', ['$scope', '$state', 'socket', 'player', function($scope, $state, socket, player) {

	$scope.join = function() {

		socket.emit('join', player.profile);

	};

  $scope.profile = player.profile;
  console.log($scope.profile);
  
  $scope.logout = function() {
    Auth.destroyCredentials();
  };

	$scope.hostGame = function() {

		$state.go('profile.host');

	};

  socket.on('started', function(data) {
    player.playerNum = String(data.playerNum);
    $state.go('profile.game');
  });

}]);