angular.module('bnMentorsApp').directive('footerDirective', function(
    $rootScope,
    $location,
    $window
) { 'use strict';

    return {
        templateUrl: 'footer.html',
        link: function($scope) {
        }
    };
});
