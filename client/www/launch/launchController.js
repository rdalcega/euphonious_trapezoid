sphero.controller('launchController', ['$scope', 'socket','$window', function($scope, socket, $window) {

	$scope.join = function() {
    	console.log('joined');
		socket.emit('join');

	}

	$scope.host = function() {
    	console.log('hosting');
		socket.emit('host');

	}

}]);