sphero.controller('navController',['$scope', '$window', 'Auth', 'Player', function($scope, $window, Auth, player) {

  $scope.signUp = function() {

    Auth.signUp($scope.username, $scope.password, $scope.email)
      .then(function(error, success) {
        if (error) {
          throw error
        }

        $scope.username = '';
        $scope.password = '';
        $scope.email = '';

      });

  }


  $scope.login = function() {

    Auth.login($scope.username, $scope.password)
      .then(function(error, user) {

        if (error) {
          throw error;
        }

        $window.setItem('sphero.username', user.profile.userName);

        $window.setItem('sphere.token', user.token);

      });

  }

}]);