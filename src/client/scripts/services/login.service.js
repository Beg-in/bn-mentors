angular.module('bnMentorsApp').factory('LoginService', function(
    ApiService
) { 'use strict';

    var base = '/login/';

    var setKey = function(key) {
        ApiService.login.key = key;
        state.sessionKey = key;
    };

    var remember = function() {
        return ApiService.put(base + 'remember').success(function(response) {
            var key = response.token;
            setKey(key);
            LocalStorageService.remember(key);
        });
    };

    var init = function() {
        var key = LocalStorageService.getKey();
        if(key) {
            setKey(key);
            state.isLoggedIn = true;
        }
        var localStoreCurrentUser = LocalStorageService.restoreState('currentUser');
        if(localStoreCurrentUser) {
            state.currentUser = localStoreCurrentUser;
            state.isLoggedIn = true;
        }
        getCurrentUser();
    };
    init();

    return {
        get: state,
        remember: remember,
        forget: forget,
        login: function(data, shouldRemember) {
            return ApiService.post(base, data).success(function(response) {
                if(shouldRemember) {
                    remember();
                } else {
                    AlertService.setWarn('Click here if you would like us to remember your login', false, remember);
                }
                setCurrentUser(ProfileService.convertIncomingProfile(response));
            });
        }
    };
});
