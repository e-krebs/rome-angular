angular.module('rome-angular')
  .directive('rome', romeDirective);

romeDirective.$inject = ['romeConfig'];

function romeDirective(romeConfigProvider) {
  return {
    restrict: 'A',
    scope: {
      rome: '=',
      romeChange: '&',
      romeOptions: '='
    },
    link: function(scope, element, attrs, ctrl, $parse) {
      // getting the default options set up via romeConfigProvider
      this.options = (typeof (romeConfigProvider.defaults) == 'object') ?
        angular.copy(romeConfigProvider.defaults) : {};
      // getting the options defined for this element via scope.romeOptions
      // they will override the options set up via romeConfigProvider
      if (typeof (scope.romeOptions) == 'object') {
        for (var item in scope.romeOptions) {
          if (scope.romeOptions.hasOwnProperty(item)) {
            this.options[item] = scope.romeOptions[item];
          }
        }
      }
      // getting the initialValue, priority being :
      // 1. from options (i.e. via romeConfigProvider or via romeOptions)
      // 2. from scope.rome
      // 3. new Date()
      if (typeof (this.options.initialValue) == typeof undefined) {
        this.options.initialValue = (typeof (scope.rome) == typeof undefined) ?
          new Date() : new Date(scope.rome);
      }
      // initializing rome
      var cal = rome(element[0], this.options);
      // storing the oldDate somewhere to avoid triggering changes too often
      cal.oldDate = angular.copy(cal.getDate());
      // catching rome updating the value
      // unfortunately, value = cal.getDateString() which is not interesting for us
      // we're working with javascript dates which are provided by cal.getDate()
      cal.on('data', function(value) {
        var newDate = cal.getDate();
        // only if date changed since last time
        if (newDate.toString() != cal.oldDate) {
          // triggering scope update and storing oldDate for the next change
          scope.$apply(function() {
            scope.rome = newDate;
            cal.oldDate = angular.copy(newDate);
          }, true);
          // triggering change function
          if (typeof (scope.romeChange) == 'function') {
            scope.$apply(function() {
              scope.romeChange();
            }, true);
          }
        }
      });
      // on angular programmatically updating rome's underlying value
      scope.$watch('rome', function(newValue, oldValue) {
        // only if date changed since last time
        if (typeof (newValue) != typeof undefined &&
          newValue.toString() != cal.oldDate) {
          // updating rome object + the element value (displayed to the user)
          cal.setValue(newValue);
          element[0].value = cal.getDateString();
          // triggering change function
          if (typeof (scope.romeChange) == 'function') {
            scope.romeChange();
          }
        }
      }, true);
    }
  };
}
