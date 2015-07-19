var nyccampSails = angular.module('nyccampSails', [ 'ngRoute', 'ui.router', 'ngMaterial', 'uuid4']);
nyccampSails.config(function($urlRouterProvider, $locationProvider, $stateProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');
  
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('grey');
  
  $stateProvider
  // Home page
  .state('home', {
    url : '/',
    templateUrl : 'states/home/index.html',
    controller : 'HomeController',
  });
});

nyccampSails.constant('endpointUrl', 'http://localhost:1337');