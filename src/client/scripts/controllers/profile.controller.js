angular.module('bnMentorsApp').controller('profileController', function(
    $scope,
    md5
) { 'use strict';

    $scope.edit = false;

    $scope.toggleEdit = function() {
        $scope.edit = !$scope.edit;
        if ($scope.profile.email) {
            $scope.gravatar = md5.createHash($scope.profile.email);
        }
    };

    $scope.profile = {
        name: 'Brandon Frisch',
        email: 'bfrish1@gmail.com',
        phone: '847.847.8847',
        skills: ['law', 'business', 'technology', 'science'],
        shortbio: 'Hi, welcome to Chili\'s!'
    };

    if ($scope.profile.email) {
        $scope.gravatar = md5.createHash($scope.profile.email);
    }
    
});