sphero.controller('navController', ['$scope', '$window', 'Auth', function($scope, $window, Auth) {

  $scope.signUp = function(username, password, email) {

    Auth.signUp(username, password, email)
      .then(function(success) {

      });

  };


  $scope.login = function(username, password) {

    Auth.login(username, password)
      .then(function(user) {
        console.log(user);

        $window.localStorage.setItem('id_token', user.token);

      });

  };

  $scope.logout = function() {

    $window.localStorage.removeItem('id_token');

  };

}]);
