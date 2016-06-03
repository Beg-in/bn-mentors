angular.module('bnMentorsApp').directive('headerDirective', function(
    $rootScope,
    $location,
    $window
) { 'use strict';

    return {
        templateUrl: 'header.html',
        link: function($scope) {
        }
    };
});
