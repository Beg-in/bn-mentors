angular.module('bnMentorsApp').factory('ProfileService', function(
    ApiService
) { 'use strict';

    var base = '/profile/';

    return {
        getUserProfile: function(id) {
            return ApiService.get(base + id).success(function(response) {
                return response;
            });
        },
        setUserProfile: function(id, data) {
            return ApiService.put(base + id, data).success(function(response) {
                return response;
            });
        },
        getAllData: function() {
          return ApiService.get(base).success(function(response) {
            console.log("The real response", response);
            return (response);
          });
        }
    };
});
