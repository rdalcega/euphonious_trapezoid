sphero.controller('launchController', ['$scope', 'socket', function($scope, socket) {

	$scope.join = function() {
    	console.log('joined');
		socket.emit('join');

	}

	$scope.host = function() {
    	console.log('hosting');
		socket.emit('host');

	}

	socket.on('started', function() {
		console.log("the server has started a game!");

	});

}]);