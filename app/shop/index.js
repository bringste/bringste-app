'use strict';

var fs = require('fs'),
    angular = require('angular');


var ngModule = module.exports = angular.module('bringste.shop', []);


function ShopTabController($scope) {
  $scope.items = [
    { title: 'FOO', elements: 20 },
    { title: 'FOO', elements: 20 },
    { title: 'FOO', elements: 20 },
    { title: 'FOO', elements: 20 },
    { title: 'FOO', elements: 20 },
    { title: 'FOO', elements: 20 },
    { title: 'FOO', elements: 20 },
    { title: 'FOO', elements: 20 },
    { title: 'FOO', elements: 20 }
  ];
}


ngModule.config(function($stateProvider) {

  $stateProvider
    .state('app.shop', {
      url: '/shop',
      views: {
        'shop-tab': {
          template: fs.readFileSync(__dirname + '/view.html', 'utf-8'),
          controller: ShopTabController
        }
      }
    });
});