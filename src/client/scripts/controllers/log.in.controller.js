angular.module('bnMentorsApp').controller('logInController', function(
    $scope,
    $location,
    LoginService
) { 'use strict';

    $scope.profile = {};
    $scope.fail = false;
    $scope.remember = false;

    $scope.login = function() {
        $scope.fail = false;
        LoginService.login({
            email: $scope.email,
            password: $scope.password
        }, $scope.remember).success(function() {
            $location.path('/#/');
        }).error(function() {
            $scope.fail = true;
        });
    };
});
