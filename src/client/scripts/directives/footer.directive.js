angular.module('bnMentorsApp').directive('footerDirective', function(
    $rootScope,
    $location,
    $window
) { 'use strict';

    return {
        templateUrl: '/views/footer.html',
        link: function($scope) {
        }
    };
});