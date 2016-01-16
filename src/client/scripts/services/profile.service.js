angular.module('bnMentorsApp').factory('ProfileService', function(
    _,
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
            return ApiService.post(base + 'user', convertOutgoingProfile(data)).success(function(response) {
                return convertIncomingProfile(response);
            });
        }
    };
});
