(function() {
  module.exports = [
    '$scope',
    function($scope) {
      return $scope.deleteTodo = function(deleteTodo) {
        _.remove($scope.todos,
    function(todo) {
          return todo === deleteTodo;
        });
        return $scope.setTodos($scope.todos);
      };
    }
  ];

}).call(this);
