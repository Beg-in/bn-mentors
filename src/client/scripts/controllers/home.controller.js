angular.module('bnMentorsApp').controller('homeController', function(
    $scope,
    $location
) { 'use strict';
    $scope.search = function() {
        $location.path('/search');
    };
});
