angular.module('bnMentorsApp').factory('LocalStorageService', function(
    _,
    $window,
    $document
) { 'use strict';

    var state = {
        saveCookie: function(key, value, expDays) {
            $document[0].cookie = $window.encodeURIComponent(key) + '=' + $window.encodeURIComponent(value) + '; path=/; secure' + (expDays ? '; expires=' + new Date(new Date().setDate(new Date().getDate() + expDays)).toUTCString() : '');
        },
        restoreCookie: function(name) {
            var cookieMap = {};
            _.map($document[0].cookie.split('; '), function(val) {
                var split = val.split('=');
                cookieMap[$window.decodeURIComponent(split[0])] = $window.decodeURIComponent(split[1]);
            });
            return cookieMap[name];
        },
        removeCookie: function(name) {
            $document[0].cookie = $window.encodeURIComponent(name) + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"';
        },
        saveState: function(key, value) {
            $window.localStorage[key] = angular.toJson(value);
        },
        restoreState: function(key) {
            return angular.fromJson($window.localStorage[key]);
        },
        removeState: function(key) {
            delete $window.localStorage[key];
        },
        clearState: function() {
            $window.localStorage.clear();
            this.forget();
        },
        remember: function(key) {
            this.saveCookie('localStorageKey', key, 32);
        },
        getKey: function() {
            return this.restoreCookie('localStorageKey');
        },
        forget: function() {
            this.removeCookie('localStorageKey');
        }
    };

    var init = function() {
        var key = state.restoreCookie('localStorageKey');
        if(!key) {
            var temp = '';
            temp = state.restoreState('embedStorage') || '';
            state.clearState();
            if (temp !== '') {
                state.saveState('embedStorage', temp);
            }
        } else {
            state.remember(key);
        }
    };
    init();

    return state;
});
