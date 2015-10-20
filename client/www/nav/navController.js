sphero.controller('navController', ['$scope', '$window', 'Auth', function($scope, $window, Auth) {

  $scope.signUp = function(username, password, email) {

    Auth.signUp(username, password, email)
      .then(function(success) {
        console.log(signedup);
      });

  };


  $scope.login = function(username, password) {

    Auth.login(username, password)
      .then(function(user) {
        console.log(user);
        $window.localStorage.setItem('sphero.user', user.profile);

        $window.localStorage.setItem('id_token', user.token);

      });

  };

}]);
