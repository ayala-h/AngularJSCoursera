'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.controller('BoughtListController', BoughtListController)
.factory('ShoppingListFactory', ShoppingListFactory);

ShoppingListController.$inject = ['ShoppingListFactory'];

function ShoppingListController(ShoppingListFactory) {
    
    const shoppingList = ShoppingListFactory();

    this.list = shoppingList.getList();
    this.name = '';
    this.quantity = '';

    let initialItems = [
        {name: 'Plantains', quantity: 6},
        {name: 'Cheese', quantity: 4},
        {name: 'Onions', quantity: 2},
        {name: 'Olive Oil', quantity: 1},
        {name: 'Salami', quantity: 1}
    ];

    for(const item of initialItems) {
        shoppingList.addToList(item.name, item.quantity);
    }

    this.addToList = function() {
        shoppingList.addToList(this.name, this.quantity);
    }

    this.removeItem = function(index) {
        shoppingList.removeItem(index);
    }

    this.addingItem = function() {
        return (this.name !== '' || this.quantity !== '');
    }

    this.listEmpty = function() {
        return (this.list.length === 0);
    }
}

BoughtListController.$inject = ['ShoppingListFactory'];

function BoughtListController(ShoppingListFactory) {
    const shoppingList = ShoppingListFactory();

    this.list = shoppingList.getList();

    this.addToList = function(name, quantity) {
        shoppingList.addToList(name, quantity);
    }

    this.listEmpty = function() {
        return (this.list.length === 0);
    }
}

function ShoppingListFactory() {
    let ShoppingListService = function() {
        let items = [];

        this.addToList = function(itemName, itemQuantity) {
            items.push({name: itemName, quantity: itemQuantity});
        }

        this.removeItem = function(index) {
            items.splice(index, 1);
        }

        this.getList = function() {
            return items;
        }
    }

    return function() {
        return new ShoppingListService();
    }
}
