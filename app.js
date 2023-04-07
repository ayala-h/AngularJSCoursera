'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', MyFirstController);

MyFirstController.$inject = ['$scope', '$filter'];

function MyFirstController($scope, $filter) {
    var upperCaseFilter = $filter('uppercase');
    $scope.name = '';
    $scope.nameValue = 0;

    $scope.displayNameValue = () => {
        $scope.nameValue = getNumericValue($scope.name);
    };

    $scope.blur = () => {
        $scope.name = upperCaseFilter($scope.name);
    };
}

function getNumericValue(input) {
    let val = 0;
    for (const s of input) {
        val += input.charCodeAt(input.indexOf(s));
    }

    return val;
}