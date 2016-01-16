angular.module('bnMentorsApp').controller('signUpController', function(
	$scope
) { 'use strict';

  $scope.form = {
    email: "",
    password: ""
  }

  $scope.profile = {
    email: "",
    password: ""
	};

  $scope.sendFormToProfile = function() {
    $scope.profile.email = $scope.form.email;
    $scope.profile.password = $scope.form.password;
  }

});
