sphero.controller('navController',['$scope', '$window', 'Auth', 'Player', function($scope, $window, Auth, player) {

  $scope.signUp = function(username, password, email) {

    Auth.signUp(username, password, email)
      .then(function(error, success) {


      });

  };


  $scope.login = function(username, password) {

    Auth.login(username, password)
      .then(function(error, user) {

        if (error) {
          throw error;
        }

        $window.localStorage.setItem('sphero.username', user.profile.userName);

        $window.localStorage.setItem('sphero.token', user.token);

      });

  };

}]);