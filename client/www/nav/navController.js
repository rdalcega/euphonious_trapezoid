sphero.controller('navController', ['$scope', '$window', 'Auth', function($scope, $window, Auth) {

  $scope.signUp = function(username, password, email) {

    Auth.signUp(username, password, email)
      .then(function(success) {


      });

  };


  $scope.login = function(username, password) {

    Auth.login(username, password)
<<<<<<< HEAD
      .then(function(error, user) {

        if (error) {
          throw error;
        }

        $window.localStorage.setItem('sphero.username', user.profile.userName);

        $window.localStorage.setItem('sphero.token', user.token);
=======
      .then(function(user) {
        console.log(user);

        $window.localStorage.setItem('id_token', user.token);
>>>>>>> master

      });

  };

  $scope.logout = function() {

    $window.localStorage.removeItem('id_token');

  };

}]);
