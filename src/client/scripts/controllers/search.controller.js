angular.module('bnMentorsApp').controller('searchController', function(
    $scope
) { 'use strict';

    $scope.searchResults = [
        {
            name: "Radical Larry",
            email: "test@gmale.com"
        },
        {
            name: "James Bond",
            email: "007@gmale.com"
        },
        {
            name: "Brandon Frisch",
            email: "befresh1@gmale.com"
        }
    ]

});
