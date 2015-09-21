'use strict';

/**
 * @ngdoc function
 * @name rrfpageApp.controller:FinishCtrl
 * @description
 * # FinishCtrl
 * Controller of the rrfpageApp
 */
angular.module('rrfpageApp')
  .controller('FinishCtrl', function ($scope,$location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.back=function(){
      $location.path('/');
    };

  });
