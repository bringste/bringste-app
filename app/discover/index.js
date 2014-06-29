'use strict';

var fs = require('fs'),
    angular = require('angular');


var ngModule = module.exports = angular.module('bringste.discover', []);


function DiscoverTabController($scope) {
  console.log('DiscoverTabController', $scope);
}


ngModule.config(function($stateProvider) {

  $stateProvider
    .state('app.discover', {
      url: '/discover',
      views: {
        'discover-tab': {
          template: fs.readFileSync(__dirname + '/view.html', 'utf-8'),
          controller: DiscoverTabController
        }
      }
    });
});