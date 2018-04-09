/* var addTodoController */ 
module.exports =['$scope', function ($scope) { //第二个是用来增加新的待办事项
    $scope.newTodo = '';
    $scope.addTodo = function () {
        alert($newTodo)
        if (!newTodo) {
            return
        }
        $scope.todos.push({
            name: newTodo
        });
        $scope.setTodos($scope.todos);
        $scope.newTodo = '';
    }
}]