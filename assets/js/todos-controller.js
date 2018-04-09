/* var todosController */  
module.exports=['$scope', function ($scope) { //第一个controller是用来显示todolist列表
    $scope.setTodos = function (todos) {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    $scope.getTodos = function () {
        todos = localStorage.getItem('todos');
        if (todos) {
            todos = JSON.parse(todos)
        } else {
            todos = []
        }
        return todos
    }
    $scope.todos = $scope.getTodos();
}]