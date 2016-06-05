angular.module('bnMentorsApp').controller('searchController', function(
    _,
    $scope,
    ProfileService
) { 'use strict';

    ProfileService.getAllData().success(function(response) {
      var tempResponse = response;
      if(!_.isArray(response)) {
        response = tempResponse ? [tempResponse] : [];
        console.log("Service " + response);
          $scope.searchResults = response;
      }else{
        $scope.searchResults = response;
      }
    }).error(function(response){
      console.log('Failed to fetch results!');
    });
});
