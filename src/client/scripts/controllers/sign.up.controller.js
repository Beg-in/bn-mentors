angular.module('bnMentorsApp').controller('signUpController', function(
    $scope,
    ProfileService
) { 'use strict';

    $scope.profile = {};

    $scope.saveProfile = function() {
        ProfileService.setUserProfile($scope.profile);
    };

    $scope.testGetData = function() {
      ProfileService.getAllData().then(function(response) {
        $scope.profile = response;
      });

    }

});
