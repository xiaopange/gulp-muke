module.exports = ['$scope',($scope) ->
    $scope.deleteTodo = (deleteTodo) ->
        _.remove($scope.todos,(todo) -> todo == deleteTodo)
        $scope.setTodos($scope.todos)
]