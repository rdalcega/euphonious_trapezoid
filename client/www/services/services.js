sphero.service('Auth', ['$http', 'SpheroApiUrl', function($http, SpheroApiUrl) {

  var request = {};

  request.signUp = function(username, password, email) {
    console.log(username, password, email);
    return $http({
      method:'POST',
      url: SpheroApiUrl + '/player/signup',
      data: {
        username: username,
        password: password,
        email: email
      }
    }).then(function(resp) {
      console.log(resp.data);
      return resp.data;// will add immediate login to server
    });

  };

  request.login = function(username, password) {
    console.log(username, password);
    return $http({
      method:'POST',
      url: SpheroApiUrl + '/auth/login',
      data: {
        username: username,
        password: password
      }
    }).then(function(resp) {
      console.log(resp.data);
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