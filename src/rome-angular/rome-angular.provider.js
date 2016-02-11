angular.module('rome-angular')
    .provider('romeConfig', romeConfigProvider);

function romeConfigProvider() {
    // storing rome default options values
    this.setDefaults = function (options) {
        this.defaults = options;
    };

    this.$get = function () { return this; };
}
