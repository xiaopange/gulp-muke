module.exports=['$scope',($scope) ->
    $scope.setTodos =(todos) -> localStorage.setItem('todos',JSON.stringify(todos))

    $scope.getTodos = ->todos =JSON.parse(localStorage.getItem('todos')) || []

    $scope.todos = $scope.getTodos()
]