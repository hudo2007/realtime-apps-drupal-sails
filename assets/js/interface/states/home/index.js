angular.module('nyccampSails').controller('HomeController', function($scope, $stateParams, $state, $mdToast, todoItems, uuid4) {
	$scope.todos = [];
	
	todoItems.getTodos().then(function(results) {
	  $scope.todos = results;
	});
	
	// Add a todo item
	$scope.addTodo = function() {
	  $scope.todos.push({
	    title : [ { value : '' }],
	    type : [ { target_id : 'todo' } ],
	    status : [ { value : 1 } ],
	    temp_id : uuid4.generate(),  // Set a temporary UUID so we can match it when it comes back from pub/sub
	  });
	}
	
	// Delete a todo item
	$scope.deleteItem = function(item, event) {
	  todoItems.destroy(item.id);
	  event.stopPropagation();
	}
	
	// Update or create a todo item
	$scope.doneEditing = function(item) {
	  if (angular.isDefined(item.nid)) {
	    todoItems.update(item.nid[0].value, item)
	    .then(function(result) {
	    }).catch(function(err) {
	    });
	  }
	  else {
	    todoItems.create(item)
	    .then(function(result) {
	      item = _.extend(item, result.data);
	    });
	  }
	}
});