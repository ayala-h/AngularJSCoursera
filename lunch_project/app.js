'use strict';

angular.module('LunchTime', [])
.controller('LunchTimeController', LunchTimeController);

function LunchTimeController($scope) {
    $scope.food = '';
    $scope.message = '';

    $scope.outputMessage = () => {
        var input = $scope.food.split(',');
        var foods = [];

        for (const f of input) {
            if (f !== '') {
                foods.push(f);
            }
        }

        if (foods.length > 0 && foods.length <= 3) {
            $scope.message = 'Enjoy!';
        }
        else if (foods.length > 3) {
            $scope.message = 'Too much!';
        }
        else {
            $scope.message = 'Please enter data first.';
        }
    };
}