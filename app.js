'use strict';

angular.module('myFirstApp', [])
.controller('MyFirstController', MyFirstController)
.provider('ListService', ListServiceProvider)
.filter('shortenName', ShortenNameFilter);

MyFirstController.$inject = ['$filter', 'shortenNameFilter', 'ListService'];

function MyFirstController($filter, shortenNameFilter, ListService) {
    this.name = '';

    this.addToList = function () {
        try {
            ListService.addToList({ task: this.task, time: this.time });
        }
        catch(error) {
            this.error = error.message;
        }
    }

    this.removeFromList = function(index) {
        ListService.removeFromList(index);
    }

    this.getList = function () {
        return ListService.getList();
    }
}

function ListServiceProvider() {
    var provider = this;

    provider.defaults = {
        quantity: 3
    }

    provider.$get = function () {
        return new ListService(provider.defaults.quantity);
    }
}

function ListService(amount) {
    var todoList = [];
    var maxQuantity = amount;

    this.addToList = function (item) {
        if (todoList.length < maxQuantity) {
            todoList.push(item);
        }
        else {
            throw new Error('Max quantity reached');
        }
    }

    this.getList = function () {
        return todoList;
    }

    this.removeFromList = function (index) {
        todoList.splice(index, 1);
    }
}

function ShortenNameFilter() {
    return function(name) {
        var splitName = name.split(' ');

        if (splitName.length >= 2) {
            splitName[1] = `${splitName[1][0]}.`;
        }

        return splitName.join(' ');
    };
}