sphero.controller('profileController', ['$scope', '$window', 'Auth', 'socket', '$state', 'player',
  function($scope, $window, Auth, socket, $state, player) {
  	
  	$scope.profile = player.profile;
    console.log($scope.profile);
  	
  	$scope.logout = function() {
  		Auth.destroyCredentials();
      $state.go('nav');
  	};
  	
  }
]);