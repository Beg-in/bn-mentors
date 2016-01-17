angular.module('bnMentorsApp').controller('profileController', function(
    $scope,
    $routeParams,
    $location,
    ProfileService,
    md5
) { 'use strict';

    $scope.edit = false;

    $scope.profile = {
        name: 'Brandon Frisch',
        email: 'bfrish1@gmail.com',
        phone: '847.847.8847',
        skills: ['law', 'business', 'technology', 'science'],
        shortbio: 'Hi, welcome to Chili\'s!'
    };

    if ($routeParams.id) {
        ProfileService.getUserProfile($routeParams.id).success(function(){
            console.log('it works! ' + response);
            $scope.profile = response;
        });
    } else {
        // $location.path('/#/404');
    }

    $scope.toggleEdit = function() {
        $scope.edit = !$scope.edit;
        if ($scope.profile.email) {
            $scope.gravatar = md5.createHash($scope.profile.email);
        }
    };

    

    if ($scope.profile.email) {
        $scope.gravatar = md5.createHash($scope.profile.email);
    }
    
});