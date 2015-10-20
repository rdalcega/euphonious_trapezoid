sphero.service('Auth', ['$http', function($http) {

  var request = {};

  request.signUp = function(username, password, email) {

    $http.post({

      url: '/player/signup',

      username: username,

      password: password,

      email: email

    });

  }

  request.login = function(username, password) {

    $http.post({

      url: '/auth/login',

      username: username,

      password: password


    });

  }

}]);

sphero.service('Player', [ function() {

  var player = {};

  player.username;

  player.id;

  player.token;

}]);