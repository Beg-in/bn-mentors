angular.module('bnMentorsApp').controller('homeController', function(
    $scope,
    $location
) { 'use strict';
    $scope.search = function() {
        console.log('hi');
        $location.path('/search');
    };
});
