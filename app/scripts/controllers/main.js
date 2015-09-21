'use strict';

/**
 * @ngdoc function
 * @name rrfpageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rrfpageApp
 */
 var app=angular.module('rrfpageApp')

  app.controller('MainCtrl',function ($scope,emailService) {
    $scope.resourcevalid=true;
    $scope.minDate=new Date();
    $('[data-toggle="tooltip"]').tooltip();
    $scope.model={};
    $scope.model.resources=[];
    this.awesomeThings = [
      'AngularJS',
      'HTML5 Boilerplate',
      'Karma'
    ];
    $scope.submitForm = function (model) {
      $scope.error=undefined;
      if(!$scope.Form.$valid )
      {
          $scope.setPristineToAllChildren(false);
          return "";
      }
      if(!$scope.model.resources.length)
      {
          $scope.setPristineToAllChildren(false);
          return "";
      }
      emailService.sendEmail(JSON.stringify(model)).then(
        function(result){
            $location.path('/finish');
        },
        function(error){
            $scope.error=error;
        }
      )
    };

    $scope.setPristineToAllChildren=function(value)
    {
      angular.forEach($scope.Form, function (input, key) {
          if (input !=undefined && input.hasOwnProperty("$pristine")){
              input.$pristine = value;
            }

      });
    }
    $scope.addResource=function(){
      $scope.success=undefined;
      $scope.setPristineToAllChildren(true);
        if ($scope.model.resources.length <1 && !$scope.Form.$valid)
        {
            $scope.resourcevalid=false;
            $scope.setPristineToAllChildren(false);
            return "";
        }

        if (!$scope.Form.$valid)
        {
            $scope.resourcevalid=false;
            $scope.setPristineToAllChildren(false);
            return "";
        }

          $scope.resourcevalid=true;
          var resource={
            "id":$scope.model.resources.length+1,
            "core_plataform":"Hybris",
            "resource_type":"Account Manager",
            "number_of_resources":1,
            "resource_location":"Flexible",
            "travel_acceptable":"Yes",
            "estimate_duration":"6 Months",
            "language_requirement":"Spanish",
            "special_skills_required":""
          };

          $scope.model.resources.push(resource);
          $('[data-toggle="tooltip"]').tooltip();
      };
  });

app.service("emailService",function($http,$q){
  return({
    sendEmail:sendEmail
  });

  function sendEmail(json)
  {
      var request=$http.post( "sendemail.php",json);
      return (request.then(handleSucess,handleError));
  }

  function handleError(response)
  {
    return ($q.reject("We can't send the form"));
  }
  function handleSucess(response)
  {
    return (response.data);
  }
});
