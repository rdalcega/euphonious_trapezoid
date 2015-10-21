sphero.factory('Auth', ['$http', 'SpheroApiUrl', function($http, SpheroApiUrl) {

  var request = {};

  request.signUp = function(username, password, email) {
<<<<<<< HEAD

    return $http.post({

      url: '/player/signup',

      username: username,

      password: password,

      email: email

=======
    console.log(username, password, email);
    return $http({
      method: 'POST',
      url: SpheroApiUrl + '/player/signup',
      data: {
        username: username,
        password: password,
        email: email
      }
    }).then(function(resp) {
<<<<<<< HEAD
      console.log(resp.data);
      return resp.data;// will add immediate login to server
>>>>>>> master
=======
      return resp.data; // will add immediate login to server
>>>>>>> master
    });

  };

  request.login = function(username, password) {
<<<<<<< HEAD

    return $http.post({

      url: '/auth/login',

      username: username,

      password: password


=======
    console.log(username, password);
    return $http({
      method: 'POST',
      url: SpheroApiUrl + '/auth/login',
      data: {
        username: username,
        password: password
      }
    }).then(function(resp) {
      return resp.data;
>>>>>>> master
    });

  };

  return request;

  return request;

}]);


/* This factory sets up a socket connection and gives you .on and .emit methods to use. It will ensure that when a callback function is called in response to a socket event (or after a socket event is emitted), that the angular $digest function is called on the $rootScope and the two-way data binding is kept in sync.
*/
sphero.factory('socket', function () {
   var socket;
   if (window.__karma__) { //in case we do testing with karma and phantom
     socket = io.connect(window.location.protocol + "//" + window.location.hostname + ":" + 1337);
   } else {
     socket = io.connect();
   }

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        callback.apply(socket, args);
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        if (callback) {
          callback.apply(socket, args);
        }
      });
    }
  };

});

