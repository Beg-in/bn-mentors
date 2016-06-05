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
          //TODO
            time: new Date('1970-01-01T20:57:00.000Z'),
            location: 'Slingshot CoWork',
            weekOfMonth: '3',
            repeatDay: 'Thursday'
        }
    };

    if ($routeParams.id) {
        ProfileService.getUserProfile($routeParams.id).success(function(response){
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
        if ($scope.edit)
        {
            ProfileService.setUserProfile($routeParams.id, $scope.profile).success(function() {
            }).error(function() {

            });
        }
        $scope.edit = !$scope.edit;
        if ($scope.profile.email) {
            $scope.fetchGravatar();
        }
    };

    if ($scope.profile.email) {
        $scope.fetchGravatar();
    }

});
