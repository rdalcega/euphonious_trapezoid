sphero.controller('navController',['$scope', '$window', 'Auth', 'Player', function($scope, http, player) {

  $scope.signUp = function() {

    http.signUp($scope.username, $scope.password, $scope.email)
      .then(function(error, success) {

        if (success) {

          $scope.username = '';
          $scope.password = '';
          $scope.email = '';

        }

      });

  }



  $scope.login = function() {

    http.login($scope.username, $scope.password)
      .then(function(error, user) {

        $window.setItem('sphero.username', user.profile.userName);

        $window.setItem('sphere.token', user.token);

      });

  }

}]);