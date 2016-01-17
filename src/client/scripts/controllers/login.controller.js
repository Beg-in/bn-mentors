angular.module('bnMentorsApp').controller('loginController', function(
    $scope
) { 'use strict';

    $scope.form = {};
    $scope.profile = {};

    $scope.sendFormToProfile = function() {
        $scope.profile.email = $scope.form.email;
        $scope.profile.password = $scope.form.password;
    };
});
