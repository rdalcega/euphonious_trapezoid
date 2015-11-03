sphero.controller('launchController', ['$scope', '$state', 'socket', 'player', function($scope, $state, socket, player) {

  $scope.join = function() {

    $state.go('loading', {
      action: 'join'
    });

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

    $state.go('profile.host');

  };

  $scope.init = function() {

    socket.emit('grabProfile', player.profile);

  };

  $scope.init();

}]);
