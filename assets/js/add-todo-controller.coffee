module.exports =['$scope',($scope) ->
    $scope.newTodo=''
    $scope.addTodo = (newTodo) ->
        return unless newTodo

        $scope.todos.push(
            name:newTodo
        )
        $scope.setTodos($scope.todos)
        $scope.newTodo=''
]