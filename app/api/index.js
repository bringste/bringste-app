'use strict';

var angular = require('angular');


var ngModule = module.exports = angular.module('bringste.api', []);


function ShoppingLists($rootScope) {

  var lists = [{
    id: 1,
    name: 'My First List',
    items: [
      { name: 'Coke' },
      { name: 'Beer' },
      { name: 'Butter' }
    ]
  },
  {
    id: 2,
    name: 'Sweden List',
    items: [
      { name: '20 Kex' }
    ]
  }];

  var nextId = 0;

  this.refresh = function() {
    lists.length = 0;
    $rootScope.$broadcast('shoppingList.changed', lists);
  };

  this.query = function() {
    return lists;
  };

  this.create = function(list) {
    list.id = nextId++;
    lists.push(list);
  };

  this.update = function(list) {};

  this.get = function(id) {

    var list;

    angular.forEach(lists, function(l) {
      if (l.id === id) {
        list = l;
      }
    });

    return list;
  };
}

ngModule.service('shoppingLists', ShoppingLists);