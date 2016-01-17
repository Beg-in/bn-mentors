/**
 * @ngdoc service
 * @name bnMentorsApp.service:ApiService
 * @description
 *
 * A service that manages the active api and a list of all availble api locations
 */
angular.module('bnMentorsApp').factory('ApiService', function(
    _,
    $q,
    $http,
    ApiConfig
) { 'use strict';

    /**
     * @ngdoc object
     * @name bnMentorsApp.service:ApiService#state
     * @propertyOf bnMentorsApp.service:ApiService
     * @description the state of the service to be shared externally through the get method.
     *
     *  - **active** – `{string}` – The key of the active loction in the location list
     *  - **list** – `{string}` – a list of all the available api locations
     *  - **api** – `{string}` – the full uri string of the current api location
     */
    var state = {
        api: 'https:' + ApiConfig.active,
        list: angular.copy(ApiConfig)
    };

    var init = function() {
        var active = state.list.active;
        delete state.list.active;
        state.active = state.list[active];
    };
    init();

    var login = {};

    var csrfToken;

    var request = function(method, url, data, config) {
        if(!config) {
            config = {};
        }
        if(data) {
            config.data = data;
        }
        if(url) {
            config.url = url;
        }
        if(!config.headers) {
            config.headers = {};
        }
        if(login.key) {
            config.headers['IR-Auth'] = login.key;
        }
        if(csrfToken) {
            config.headers['IR-CSRF'] = csrfToken;
        }
        config.method = method;
        config.url = state.active + config.url;
        config.withCredentials = true;
        var loginError = false;
        var http = $http(config).success(function(response, status, headers) {
            var newCsrfToken = headers()['ir-csrf'];
            if(newCsrfToken) {
                csrfToken = newCsrfToken;
            }
        }).error(function(response, status) {
            if(status === 401) {
                loginError = true;
                login.error();
                return;
            }
            console.log('API error: ' + response.error, true);
        });
        var oldError = http.error;
        http.error = function(cb) {
            oldError(function() {
                if(!loginError) {
                    cb.apply(cb, arguments);
                }
            });
        };
        return http;
    };

    return {
        location: state,
        setApi: function(api) {
            if(!state.list[api]) {
                console.log('Invalid api location: ' + api);
                return;
            }
            state.active = state.list[api];
        },
        login: login,
        'delete': function(url, config) {
            return request('DELETE', url, undefined, config);
        },
        get: function(url, config) {
            return request('GET', url, undefined, config);
        },
        post: function(url, data, config) {
            return request('POST', url, data, config);
        },
        put: function(url, data, config) {
            return request('PUT', url, data, config);
        },
        postMultipart: function(url, files, config) {
            var formData = new FormData();
            _.forEach(files, function(file, key) {
                formData.append(key, file);
            });
            if(!config) {
               config = {};
            }
            config.transformRequest = angular.identity;
            config.headers = {
                'Content-type': undefined
            };
            return request('POST', url, formData, config);
        },
        mockHttpPromise: function(mockResponse, isError) {
            var defer = $q.defer();
            defer.resolve();
            defer.promise.success = function(cb) {
                if(!isError) {
                    cb(mockResponse);
                }
                return defer.promise;
            };
            defer.promise.error = function(cb) {
                if(isError) {
                    cb(mockResponse);
                }
                return defer.promise;
            };
            return defer.promise;
        }
    };
});
