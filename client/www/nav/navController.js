sphero.controller('navController', ['$scope', '$window', 'Auth', 'socket', '$state',
 function($scope, $window, Auth, socket, $state) {

  $scope.single = function() {

    socket.emit('single');

  };

  $scope.signUp = function(username, password, email) {

    Auth.signUp(username, password, email)
      .then(function(success) {


      });

  };


  $scope.login = function(username, password) {

    Auth.login(username, password)
      .then(function(user) {

        $window.localStorage.setItem('id_token', user.token);

      });

  };

  $scope.logout = function() {

    $window.localStorage.removeItem('id_token');

  };

  socket.on('started', function(data) {
    $state.go('game');
    player.playerNum = data.playerNum;
  });

}]);
