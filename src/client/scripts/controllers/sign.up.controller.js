angular.module('bnMentorsApp').controller('signUpController', function(
    $scope,
    ProfileService
) { 'use strict';

    $scope.profile = {};

    $scope.saveProfile = function() {
        ProfileService.setUserProfile($scope.profile);
    };

});