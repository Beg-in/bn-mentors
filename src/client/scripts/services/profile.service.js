angular.module('bnMentorsApp').factory('ProfileService', function(
    ApiService
) { 'use strict';

    var base = '/#/profile/';

    return {
        getUserProfile: function(id) {
            return ApiService.get(base + id).success(function(response) {
                return response;
            });
        },
        setUserProfile: function(data) {
            return ApiService.post(base + 'user', data).success(function(response) {
                return response;
            });
        },
        getAllData: function() {
          return ApiService.get('/user/all/').then(function(response) {
            return response.data;
          });
        }
    };
});
