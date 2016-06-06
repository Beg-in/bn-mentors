angular.module('bnMentorsApp').controller('404Controller', function(
    $scope
) { 'use strict';
    $scope.quotes = [
        'The word \'happiness\' would lose its meaning if it were not balanced by sadness.',
        'Such is the life of a man. Moments of joy, obliterated by unforgettable sadness.',
        'I had sadness for breakfast.',
        'Crying is cleansing. There\'s a reason for tears, happiness or sadness.',
        'Expectation is the root of all heartache.',
        'There is nothing so cleansing or reassuring as a vicarious sadness.'
    ];
    $scope.quoted = [
        'Carl Jung',
        'Marcel Pagnol',
        'Andy Milonakis',
        'Dionne Warwick',
        'William Shakespeare',
        'David Rakoff'
    ];
    var randomNumber = Math.floor((Math.random() * 6));
    $scope.visibleQuotes = $scope.quotes[randomNumber];
    $scope.visibleQuoted = $scope.quoted[randomNumber];
});
