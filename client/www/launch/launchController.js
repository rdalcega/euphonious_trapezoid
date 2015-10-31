sphero.controller('launchController', ['$scope', '$state', 'player', function($scope, $state, player) {

  $scope.join = function() {

<<<<<<< 573e4432050de9a9f0f94bcb4821fafc657ad9e1
    $state.go('loading', {
      action: 'join'
    });
=======
		$state.go('loading', {action: 'join' });
>>>>>>> Remove sockets from nav and launch

  };

  $scope.back = function() {
    $state.go('nav');
  }

  $scope.profile = player.profile;
  console.log($scope.profile);

  $scope.logout = function() {
    Auth.destroyCredentials();
  };

  $scope.hostGame = function() {

<<<<<<< 573e4432050de9a9f0f94bcb4821fafc657ad9e1
    $state.go('profile.host');

  };
=======
		$state.go('host');
>>>>>>> Remove sockets from nav and launch

  $scope.init = function() {

    socket.emit('grabProfile', player.profile);

  };

<<<<<<< 573e4432050de9a9f0f94bcb4821fafc657ad9e1
  $scope.init();

}]);
=======
}]);
>>>>>>> Remove sockets from nav and launch
