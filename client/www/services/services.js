sphero.factory('Auth', ['$http', 'SpheroApiUrl', function($http, SpheroApiUrl) {

  var request = {};

  request.signUp = function(username, password, email) {

    return $http({
      method: 'POST',
      url: SpheroApiUrl + '/player/signup',
      data: {
        username: username,
        password: password,
        email: email
      }
    }).then(function(resp) {
      return resp.data; // will add immediate login to server
    });

  };

  request.login = function(username, password) {

    return $http({
      method: 'POST',
      url: SpheroApiUrl + '/auth/login',
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


/* This factory sets up a socket connection and gives you .on and .emit methods to use.
*/
sphero.factory('socket', ['SpheroApiUrl', '$rootScope', function (SpheroApiUrl, $rootScope) {
   var socket;
   // if (window.__karma__) { //in case we do testing with karma and phantom
   //   socket = io.connect(window.location.protocol + "//" + window.location.hostname + ":" + 1337);
   // } else {
     socket = io.connect(SpheroApiUrl);
   // }

    socket.on('connect', function() {

      socket.on('started', function(data) {
        socket.emit('something');
        console.log('Im starting ', data);

      });

    });

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      console.log('emitting...')
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };

}]);

