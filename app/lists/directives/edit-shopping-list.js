'use strict';

var fs = require('fs');


function EditShoppingListController($scope) {

  $scope.showLocation = $scope.list.sourceLocation || $scope.list.targetLocation;

  $scope.showReward = $scope.list.published && $scope.list.status == 'open';


  $scope.deleteItem = function(item) {

    var items = $scope.list.items;
    var idx = items.indexOf(item);

    if (items.length === 1 || idx === items.length - 1) {
      return;
    }

    items.splice(items.indexOf(item), 1);
  };

  $scope.focusItem = function(item) {
    var items = $scope.list.items;

    if (items.indexOf(item) === items.length - 1) {
      items.push({ });
    }
  };

}


module.exports = function() {

  return {
    restrict: 'EA',
    scope: {
      list: '='
    },
    template: fs.readFileSync(__dirname + '/edit-shopping-list.html', 'utf-8'),
    controller: EditShoppingListController
  };

};