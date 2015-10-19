angular.module('sphero.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
      
    .state('nav', {
      url: '/nav',
      templateUrl: '../nav/nav.html',
      controller: 'navController'
    })
    .state('launch', {
      url: '/launch',
      templateUrl: '../launch/launch.html',
      controller: 'launchController'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/nav');

});