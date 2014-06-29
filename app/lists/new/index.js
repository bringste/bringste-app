'use strict';

var fs = require('fs');


function NewListController($scope, $state, shoppingLists) {

  $scope.shoppingList = {
    items: [
      {}
    ]
  };

  $scope.save = function() {
    var shoppingList = $scope.shoppingList;

    shoppingList.items = shoppingList.items.filter(function(e) {
      return e.name;
    });

    shoppingLists.create(shoppingList);
    $state.go('^.index');
  };

}


module.exports = {
  controller: NewListController,
  template: fs.readFileSync(__dirname + '/view.html', 'utf-8')
};