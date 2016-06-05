angular.module('bnMentorsApp').controller('searchController', function(
    $scope,
    ProfileService
) { 'use strict';

    console.log(ProfileService.get.getAllData);

    $scope.searchResults = [
        {
            name: 'Henry Jones',
            shortBio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            skills: ['teaching', 'raiding', 'whipping', 'exploring'],
            jobTitle: 'Archaeologist'
        },
        {
            name: 'Rick Deckard',
            shortBio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            skills: ['dreaming','testing', 'retiring', 'running'],
            jobTitle: 'Blade Runner'
        },
        {
            name: 'Han Solo',
            shortBio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            skills: ['flying', 'charming', 'friendship', 'nerf-herding'],
            jobTitle: 'Pilot'
        }
    ]
});
