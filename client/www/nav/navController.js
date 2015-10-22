sphero.controller('navController', ['$scope', '$window', 'Auth', 'socket', function($scope, $window, Auth, socket) {

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

}]);
