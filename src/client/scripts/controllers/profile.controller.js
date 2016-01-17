angular.module('bnMentorsApp').controller('profileController', function(
	$scope
) { 'use strict';

	$scope.edit = false;

	$scope.toggleEdit = function() {
		$scope.edit = !$scope.edit;
	};

	$scope.profile = {
		name: 'Brandon Frisch',
		email: 'bfrisch1@gmail.com',
		phone: '847.847.8847',
		skills: ['law', 'business', 'technology', 'science'],
		shortbio: 'Im awesome!'
	};
});
