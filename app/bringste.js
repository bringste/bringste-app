'use strict';

var fs = require('fs');

var cordova = require('cordova'),
    angular = require('angular'),
    StatusBar = require('status-bar');


var ngModule = module.exports = angular.module('bringste', [
  'ionic',
  require('./api').name,
  require('./lists').name,
  require('./shop').name,
  require('./discover').name
]);



ngModule.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/lists');

  $stateProvider.state('app', {
    abstract: true,
    template: fs.readFileSync(__dirname + '/__layout/main.html', 'utf-8')
  });

});


ngModule.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {

    // hide the accessory bar by default
    if (cordova && cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (StatusBar) {
      StatusBar.styleDefault();
    }
  });

});