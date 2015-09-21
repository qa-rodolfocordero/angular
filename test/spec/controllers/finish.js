'use strict';

describe('Controller: FinishCtrl', function () {

  // load the controller's module
  beforeEach(module('rrfpageApp'));

  var FinishCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinishCtrl = $controller('FinishCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FinishCtrl.awesomeThings.length).toBe(3);
  });
});
