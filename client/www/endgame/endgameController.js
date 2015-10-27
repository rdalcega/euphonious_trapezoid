sphero.controller('endgameController', ['$scope', '$state', 'socket', 'player', 'Auth',
	function($scope, $state, socket, player, Auth) {

  //allow player to friend other players
	$scope.friend = function(otherPlayer) {

    Auth.addFriend(otherPlayer, player.profile.id);

	};

  //return player to nav screen
  $scope.leave = function() {

    $state.go('nav');

  }

	$scope.players = [];

  //receive usernames and scores of players user played with
  socket.on('endgame', function(data) {
    

    
  });

}]);