angular.module('bnMentorsApp', [
    'ngAnimate',
    'ngRoute',
    'lodash',
    'templates',
    'angular-md5'
]).config(function(
    $locationProvider,
    $routeProvider,
    $provide,
    $compileProvider
) { 'use strict';


    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');

    $routeProvider.when('/', {
        //home page
        templateUrl: 'home.html',
        controller: 'homeController'
    }).when('/index.html', {
        redirectTo: '/'
    }).when('/404', {
        //404 error
        templateUrl: '404.html',
        controller: '404Controller'
    }).when('/mentors', {
        //mentors call to action
        templateUrl: 'mentors.html',
        controller: 'mentorsController'
    }).when('/search', {
        //search page
        templateUrl: 'search.html',
        controller: 'searchController'
    }).when('/log-in', {
        //log in page
        templateUrl: 'log-in.html',
        controller: 'logInController'
    }).when('/profile/:id', {
        //profile page
        templateUrl: 'profile.html',
        controller: 'profileController'
    }).when('/profile', {
        //profile page example
        templateUrl: 'profile.html',
        controller: 'profileController'
    }).when('/sign-up', {
        //sign up
        templateUrl: 'sign-up.html',
        controller: 'signUpController'
    }).when('/ourstory', {
        //about page
        templateUrl: 'our-story.html',
        controller: 'ourStoryController'
    }).when('/termsofuse', {
        //terms of use
        templateUrl: 'terms-of-use.html',
        controller: 'staticController'
    }).when('/calendar', {
        //calendar page
        templateUrl: 'calendar.html',
        controller: 'calendarController'
    }).otherwise({
        redirectTo: '/404'
    });

}).run(function(
    $rootScope,
    $window,
    $route,
    $location
) { 'use strict';

    $rootScope.$on('$routeChangeStart', function(event, next) {
        $window.scrollTo(0,0);
        var c = next.$$route.controller ? next.$$route.controller.indexOf('Controller') : -1;
        if(c === -1) {
            $rootScope.pageName = '';
            return;
        }
        $rootScope.pageName = next.$$route.controller.substring(0, c) + 'Page';
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        if ($rootScope.pageName === 'homePage') {
            $rootScope.noBootstrap = true;
            $rootScope.firstLoad = true;
        } else {
            $rootScope.noBootstrap = false;
            $rootScope.firstLoad = true;
        }
    });

});
