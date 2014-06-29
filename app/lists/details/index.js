'use strict';

var fs = require('fs');


function ListDetailController($scope, shoppingList) {

  $scope.shoppingList = shoppingList;


  // deal with updates

  $scope.$on('shoppingList.changed', function(e, l) {
    if ($scope.shoppingList.id === l.id) {
      $scope.shoppingList = l;
    }
  });

}


module.exports = {
  controller: ListDetailController,
  template: fs.readFileSync(__dirname + '/view.html', 'utf-8'),
  resolve: {
    shoppingList: function ($stateParams, shoppingLists) {
      return shoppingLists.get(parseInt($stateParams.listId, 10));
    }
  }
};