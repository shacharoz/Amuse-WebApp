var app = angular.module('amuseApp', ['ngRoute','ui.bootstrap-slider']);

app.config(function($routeProvider,) {
  $routeProvider
    .when('/', {
      templateUrl : 'templates/homepage.html'
    })
    .when('/therapists', {
      templateUrl : 'templates/therapists.html'
    })
    .when('/patients', {
      templateUrl : 'templates/patients.html'
    })
    .when('/programs', {
      templateUrl : 'templates/programs.html'
    })
    .when('/program/:id', {
      templateUrl : 'templates/program.html'
    })
    .when('/controls', {
      templateUrl : 'templates/controls.html'
    });
});
