(function() {
  module.exports = [
    '$scope',
    function($scope) {
      $scope.newTodo = '';
      return $scope.addTodo = function(newTodo) {
        if (!newTodo) {
          return;
        }
        $scope.todos.push({
          name: newTodo
        });
        $scope.setTodos($scope.todos);
        return $scope.newTodo = '';
      };
    }
  ];

}).call(this);
