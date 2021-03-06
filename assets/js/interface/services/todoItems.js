angular.module('nyccampSails').service('todoItems', function($http, $q, $rootScope, endpointUrl) {
  var todos = null;
  
  // Callback for Socket I/O subscriptions
  io.socket.on('node', function(event) {
    console.log('Response received: ' + Date.now());
    switch (event.verb) {
      case 'created':
        // Try to find the todo item by the temporary UUID
        var idx = _.findIndex(todos, { temp_id : event.data.temp_id });
        
        // If it doesn't exist create it
        if (-1 == idx) {
          todos.push(event.data);
        }
        // Otherwise update it
        else {
          todos[idx] = _.extend(todos[idx], event.data);
        }
        
        // Make sure we trigger a digest loop
        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }
        
        break;
        
      case 'updated':
        // Update a todo item
        var idx = _.findIndex(todos, { id : event.data.id });
        todos[idx] = _.extend(todos[idx], event.data);
        
        // Trigger the digest loop
        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }
        break;
        
      case 'destroyed':
        // Remove any todo items that match the ID
        _.remove(todos, function(todo) {
          return (todo.id == event.id); 
        });
        
        if (!$rootScope.$$phase) {
          $rootScope.$apply();
        }
        
        break;
    }
  });
  
  // Return a list of todo items
  function getTodos() {
    // If we have it locally return that
    if (todos) {
      return $q.when(todos);
    }
    // Otherwise load it from the REST API
    else {
      return find().then(function(results) {
        todos = results;
        return todos;
      });
    }
  }
  
  // Update a todo item
  function update(id, params) {
    console.log('Request sent: ' + Date.now());
    var defer = $q.defer();
    
    io.socket.put('/node/' + id, params, function(resData, jwres) {
      defer.resolve();
    });
    
    return defer.promise;
  }
  
  // Create a todo item
  function create(params) {
    console.log('Request sent: ' + Date.now());
    var defer = $q.defer();
    
    io.socket.post('/node', params, function(resData, jwres) {
      defer.resolve(resData);
    });
    
    return defer.promise;
  }
  
  // Find a set of todo item
  function find(params) {
    var defer = $q.defer();
    
    io.socket.get('/node', function(resData, jwres) {
      defer.resolve(resData);
      
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    });
    
    return defer.promise;
  }
  
  // Find a single todo item
  function findOne(id) {
    return $http({
      method : 'GET',
      url : endpointUrl + '/node/' + id
    });
  }
  
  // Delete a todo item
  function destroy(id) {
    console.log('Request sent: ' + Date.now());
    var defer = $q.defer();
    
    io.socket.delete('/node/' + id, function(resData, jwres) {
      defer.resolve(resData);
    });
    
    return defer.promise;
  }
  
  return {
    update : update,
    create : create,
    find : find,
    findOne : findOne,
    destroy : destroy,
    getTodos : getTodos
  }
});
