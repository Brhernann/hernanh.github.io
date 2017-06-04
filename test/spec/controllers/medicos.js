'use strict';

describe('Controller: MedicosCtrl', function () {

  // load the controller's module
  beforeEach(module('hernanhApp'));

  var MedicosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MedicosCtrl = $controller('MedicosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MedicosCtrl.awesomeThings.length).toBe(3);
  });
});
