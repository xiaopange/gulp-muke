/* var todoController */ 
module.exports=['$scope', function ($scope) { //第三个是用来删除现有的代办事件
    $scope.deleteTodo = function (deleteTodo) {
        _.remove($scope.todos, function (todo) {
            return todo = deleteTodo
        })
        $scope.setTodos($scope.todos)
    }
}]