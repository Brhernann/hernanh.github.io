'use strict';

describe('Controller: MishorasCtrl', function () {

  // load the controller's module
  beforeEach(module('hernanhApp'));

  var MishorasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MishorasCtrl = $controller('MishorasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MishorasCtrl.awesomeThings.length).toBe(3);
  });
});
