'use strict';

var fs = require('fs');


function EditListController($scope, $state, shoppingList, shoppingLists) {

  $scope.shoppingList = shoppingList;

  $scope.shoppingList.items.push({ name: '' });

  $scope.save = function() {
    var shoppingList = $scope.shoppingList;

    shoppingList.items = shoppingList.items.filter(function(e) {
      return e.name;
    });

    shoppingLists.update(shoppingList);

    $state.go('^.details', { listId: shoppingList.id });
  };
}


module.exports = {
  controller: EditListController,
  template: fs.readFileSync(__dirname + '/view.html', 'utf-8'),
  resolve: {
    shoppingList: function ($stateParams, shoppingLists) {
      return shoppingLists.get(parseInt($stateParams.listId, 10));
    }
  }
};