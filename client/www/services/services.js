sphero.service('Auth', ['$http', function($http) {

  var request = {};

  request.signUp = function(username, password, email) {
    console.log(username, password, email);
    return $http({
      method:'POST',
      url: '/player/signup',
      data: {
        username: username,
        password: password,
        email: email
      }
    }).then(function(resp) {
      return resp.data;// will add immediate login to server
    });

  };

  request.login = function(username, password) {
    console.log(username, password);
    return $http({
      method:'POST',
      url: '/auth/login',
      data: {
        username: username,
        password: password
      }
    }).then(function(resp) {
      return resp.data;
    });

  };
  return request;

}]);

sphero.service('Player', [ function() {

  var player = {};

  player.username;

  player.id;

  player.token;

}]);