angular.module('bnMentorsApp', [
    'ngAnimate',
    'ngRoute'
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
        templateUrl: '/views/home.html',
        controller: 'homeController'
    }).when('/index.html', {
        redirectTo: '/'
    }).when('/404', {
        //404 error
        templateUrl: '/views/404.html',
        controller: 'staticController'
    }).when('/home', {
        //static page
        templateUrl: '/views/404.html',
        controller: 'staticController'
    }).when('/login', {
        //static page
        templateUrl: '/views/login.html',
        controller: 'loginController'
    }).when('/profile', {
        //static page
        templateUrl: '/views/profile.html',
        controller: 'profileController'
    }).when('/signup', {
        //static page
        templateUrl: '/views/sign-up.html',
        controller: 'signUpController'
    }).when('/about', {
        //static page
        templateUrl: '/views/sign-up.html',
        controller: 'signUpController'
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
