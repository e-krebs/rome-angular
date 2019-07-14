/* global rome */
describe('rome-angular', function() {
  // Load the module
  beforeEach(module('rome-angular'));
  var scope;
  beforeEach(inject(function($rootScope, $compile) {
    // Set up the scope with test data
    scope = $rootScope.$new();
    scope.date = new Date(1982, 9, 16, 7, 22);
  }));

  describe('no config', function() {
    // Inject $rootScope, $compile and romeConfig
    var input;
    var div;
    beforeEach(inject(function($rootScope, $compile) {
      // Create element with default configuration
      input = angular.element('<input type="text" rome="date"></input>');
      div = angular.element('<div rome="date"></div>');
      // Compile this element with the scope
      input = $compile(input)(scope);
      div = $compile(div)(scope);
      // Run the digest cycle to ACTUALLY compile the elements
      $rootScope.$digest();
    }));

    // Test that it worked
    it('(input with no config) should display date as YYYY-MM-DD HH:mm',
      function() {
        expect(input.val()).toEqual('1982-10-16 07:22');
      });

    it('(input with no config) should have date as its value',
      function() {
        expect(rome(input[0]).getDate()).toEqual(scope.date);
      });

    it('(div with no config) should have date as its value',
      function() {
        expect(rome(div[0]).getDate()).toEqual(scope.date);
      });
  });

  describe('with configProvider', function() {
    // Inject $rootScope, $compile and romeConfig
    var romeConfig;
    var input;
    beforeEach(inject(function($rootScope, $compile, _romeConfig_) {
      // Set up configProvider
      romeConfig = _romeConfig_;
      romeConfig.setDefaults({
        inputFormat: 'DD/MM/YYYY HH:mm'
      });

      // Create an element with configProvider configuration
      input = angular.element('<input type="text" rome="date"></input>');
      input = $compile(input)(scope);
      $rootScope.$digest();
    }));

    // Test that it worked
    it('(input with configProvider) should display date as DD/MM/YYYY HH:mm',
      function() {
        expect(input.val()).toEqual('16/10/1982 07:22');
      });

    it('(input with configProvider) should have date as its value',
      function() {
        expect(rome(input[0]).getDate()).toEqual(scope.date);
      });

    describe('with custom configuration', function() {
      beforeEach(inject(function($rootScope, $compile, _romeConfig_) {
        input = angular.element('<input type="text" rome="date" rome-options="{inputFormat: \'DD-MM-YYYY, HH.mm\'}"></input>');
        input = $compile(input)(scope);
        $rootScope.$digest();
      }));

      it('(input with custom configuration) should display date as DD-MM-YYYY HH.mm',
        function() {
          expect(input.val()).toEqual('16-10-1982, 07.22');
        });

      it('(input with custom configuration) should have date as its value',
        function() {
          expect(rome(input[0]).getDate()).toEqual(scope.date);
        });
    });
  });
});
