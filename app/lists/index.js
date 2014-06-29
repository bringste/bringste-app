'use strict';

var fs = require('fs'),
    angular = require('angular');

var details = require('./details'),
    newList = require('./new'),
    editList = require('./edit');

var ngModule = module.exports = angular.module('bringste.lists', []);


function ListsTabController($scope, shoppingLists) {

  $scope.doRefresh = function() {
    setTimeout(function() {
      $scope.items.unshift({ title: 'NEW LIST', elements: 20 });
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
    }, 2000);
  };

  $scope.items = shoppingLists.query();
}


ngModule.directive('editShoppingList', require('./directives/edit-shopping-list'));


ngModule.config(function($stateProvider) {

  $stateProvider
    .state('app.lists', {
      abstract: true,
      url: '/lists',
      views: {
        'lists-tab': {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    });

  $stateProvider
    .state('app.lists.index', {
      url: '',
      template: fs.readFileSync(__dirname + '/view.html', 'utf-8'),
      controller: ListsTabController
    });

  $stateProvider.state('app.lists.new', angular.extend({
    url: '/new'
  }, newList));

  $stateProvider.state('app.lists.edit', angular.extend({
    url: '/:listId/edit'
  }, editList));

  $stateProvider.state('app.lists.details', angular.extend({
    url: '/:listId'
  }, details));

});