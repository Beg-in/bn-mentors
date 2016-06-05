angular.module('bnMentorsApp').controller('searchController', function(
    $http,
    _,
    md5,
    $scope,
    ProfileService
) { 'use strict';

    $scope.fetchGravatar = function() {
        _.forEach($scope.searchResults, function(value, key) {
            var gravatar = md5.createHash($scope.searchResults[key].email);
            $http.get('https://secure.gravatar.com/avatar/' + gravatar + '?s=1&d=404')
                .success(function(data, status) {
                    $scope.searchResults[key].avatar = 'https://secure.gravatar.com/avatar/' + gravatar + '?s=500';
                })
                .error(function(data, status) {
                    return null;
                })
            ;
        });
    }

    ProfileService.getAllData().success(function(response) {
      var tempResponse = response;
      if(!_.isArray(response)) {
        response = tempResponse ? [tempResponse] : [];
        $scope.searchResults = response;
      }else{
        $scope.searchResults = response;
      }
      $scope.fetchGravatar();
    //   _.forEach($scope.searchResults, function(value, key) {
    //     //   $scope.searchResults[key].avatar = $scope.fetchGravatar($scope.searchResults[key].email);
    //       console.log(;
    //   });
    }).error(function(response){
      console.log('Failed to fetch results!');
    });
});
