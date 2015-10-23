sphero.controller('navController', ['$scope', '$window', 'Auth', 'socket', '$state', 'player',
  function($scope, $window, Auth, socket, $state, player) {

    $scope.loginStatus = false;
    $scope.loaded = false;

    $scope.single = function() {
      socket.emit('single');
    };

    $scope.signUp = function(username, password, email) {
      Auth.signUp(username, password, email)
        .then(function() {
          $scope.login(username, password);
        }, function(err) {
          //handle error
        });
    };

    $scope.login = function(username, password) {
      console.log(username);
      Auth.login(username, password)
        .then(function(user) {
          if (user) {
            $window.localStorage.setItem('id_token', user.token);
            $scope.loginStatus = Auth.checkAuth();
          } else {
            //login error, handle
          }
        });
    };

    $scope.logout = function() {
      $window.localStorage.removeItem('id_token');
      Auth.destroyCredentials();
      $scope.loginStatus = false;
    };

    $scope.load = function() {
      if ($window.localStorage.getItem('id_token')) {
        Auth.loadAuth($window.localStorage.getItem('id_token'));
        $scope.loginStatus = true;
        $scope.loaded = true;
      } else {
        $scope.loaded = true;
      }
    };
    // will change the above auth check to be server-side later and integrate promises

    socket.on('started', function(data) {
      player.playerNum = String(data.playerNum);
      $state.go('game');
    });

    $scope.load();

  }
]);
