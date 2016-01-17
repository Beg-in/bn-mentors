angular.module('lodash', []).factory('_', function(
    $window
) { 'use strict';

    return $window._;
});