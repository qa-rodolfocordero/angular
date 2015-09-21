'use strict';

/**
 * @ngdoc overview
 * @name rrfpageApp
 * @description
 * # rrfpageApp
 *
 * Main module of the application.
 */
angular
  .module('rrfpageApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/finish', {
        templateUrl: 'views/finish.html',
        controller: 'FinishCtrl',
        controllerAs: 'finish'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
