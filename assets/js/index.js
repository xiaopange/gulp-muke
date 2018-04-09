/*
    目前下面已经有三个controller，如果功能更加复杂那么传统方式
    会有更多更多个controller写在下面，这对代码可读性造成不便，当然在这么大的文件中找寻解析代码也是个问题；
    故：我们将三个controller提取出来分别形成三个文件:
    (1)todos-controller.js 
    (2)addTodo-controller.js 
    (3)todo-controller.js
    然后在页面index.js前引入这三个js文件;
    接着为了要在angular的model中引入这三个controller的定义呢？在三份文件中分别定义(1)todosController (2)addTodoController (3)todoController 全局变量；
        然后在index.js中找到对应的三个controller定义替换成 三个变量 即：.controller('TodoController', todosController)

    经过此操作后index.js代码变得简化了，但是会存在全局变量污染的问题，为了避免这个问题我们使用browserify;
    Browserify使用了node.js的CommonJS模块规范来实现JS的模块化加载。CommonJS 简单来说是使用module.exports来定义JS模块，使用require语句来加载JS模块。所以要将三个js里定义变量替换成 module.exports,
        然后在index.js里 require('') 三个js即： .controller('TodosController',require('todos-controller.js')) ;
        最后 node 安装browserify，用 browserify js/todos-controller.js js/add-todo-controller.js js/todo-controller.js js/index.js -o js/main.js  此命令将四个js打包输出成main.js并在index.html中引用。
*/
var todosController = require('../js/todos-controller.js');
var addTodoController = require('../js/add-todo-controller.js');
var todoController = require('../js/todo-controller.js');
angular.module('TodoList',[]).controller('TodosController', todosController
    /* ['$scope',function($scope){ //第一个controller是用来显示todolist列表
        $scope.setTodos=function(todos){
            localStorage.setItem('todos',JSON.stringify(todos))
        }

        $scope.getTodos =function(){
            todos=localStorage.getItem('todos');
            if(todos){
                todos=JSON.parse(todos)
            }else{
                todos=[]
            }
            return todos
        }
        $scope.todos = $scope.getTodos();
    }] */
    ).controller('AddTodoController', addTodoController
    /* ['$scope',function($scope){ //第二个是用来增加新的待办事项
        $scope.newTodo='';
        $scope.addTodo=function(newTodo){
            if(!newTodo){
                return
            }
            $scope.todos.push({
                name:newTodo
            });
            $scope.setTodos($scope.todos);
            $scope.newTodo='';
        }
    }] */
    ).controller('TodoController', todoController
    /* ['$scope',function($scope){ //第三个是用来删除现有的代办事件
        $scope.deleteTodo =function(deleteTodo){
            _.remove($scope.todos,function(todo){
                return todo=deleteTodo
            })
            $scope.setTodos($scope.todos)
        }
    }] */
    );