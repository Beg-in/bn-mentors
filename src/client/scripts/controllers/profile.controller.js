angular.module('bnMentorsApp').controller('profileController', function(
    $http,
    $scope,
    $routeParams,
    $location,
    ProfileService,
    md5
) { 'use strict';

    $scope.edit = false;

    $scope.profile = {
        name: 'Harrison Ford',
        jobTitle: 'Actor',
        email: 'harrison@gmale.com',
        phone: '847.555.8847',
        skills: ['acting', 'wars', 'raiding', 'running'],
        shortBio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        schedule: {
            time: new Date(1970, 0, 1, 14, 57, 0),
            location: 'Slingshot CoWork',
            weekOfMonth: '3',
            repeatDay: 'Thursday'
        }
    };

    if ($routeParams.id) {
        ProfileService.getUserProfile($routeParams.id).success(function(){
            console.log('it works! ' + response);
            $scope.profile = response;
        });
    } else {
        // $location.path('/#/404');
    }


    $scope.fetchGravatar = function() {
        $scope.gravatar = md5.createHash($scope.profile.email);
        $http.get('https://secure.gravatar.com/avatar/' + $scope.gravatar + '?s=1&d=404')
            .success(function(data, status) {
                $scope.avatar = 'https://secure.gravatar.com/avatar/' + $scope.gravatar + '?s=500';
            })
            .error(function(data, status) {
                $scope.avatar = null;
            })
        ;
    }

    $scope.toggleEdit = function() {
        $scope.edit = !$scope.edit;
        if ($scope.profile.email) {
            $scope.fetchGravatar();
        }
    };

    $scope.updateProfile = function() {
      ProfileService.setUserProfile($scope.profile).success(function() {
        console.log("PROFILE UPDATED");
      }).error(function() {
        console.log("FAILURE");
      });
    };

    if ($scope.profile.email) {
        $scope.fetchGravatar();
    }

});
