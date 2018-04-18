(function() {
  module.exports = [
    '$scope',
    function($scope) {
      $scope.setTodos = function(todos) {
        return localStorage.setItem('todos',
    JSON.stringify(todos));
      };
      $scope.getTodos = function() {
        var todos;
        return todos = JSON.parse(localStorage.getItem('todos')) || [];
      };
      return $scope.todos = $scope.getTodos();
    }
  ];

}).call(this);
