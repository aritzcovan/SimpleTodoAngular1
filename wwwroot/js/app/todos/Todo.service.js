(function () {
    'use strict';

    angular
        .module('app')
        .service('TodoService', TodoService);

    TodoService.$inject = ['$http'];

    function TodoService($http) {
        this.apiPath = '/api/todo';
        this.getTodoList = getTodoList;
        this.createTodo = createTodo;
        this.updateTodo = updateTodo;
        this.deleteTodo = deleteTodo;
        this.markComplete = markComplete;

        ////////////////

        function getTodoList() {
            return $http({
                method: 'GET',
                url: this.apiPath
            });
        }
        
        function createTodo(obj){
            return $http({
                method: 'POST',
                url: this.apiPath,
                data: JSON.stringify(obj)
            });
        }
        
        function updateTodo(todo){
            return $http({
                method: 'PUT',
                url: this.apiPath + '/' + todo.todoId,
                data: JSON.stringify(todo) 
            });
        }
        
        function deleteTodo(todo) {
            return $http({
               method: 'DELETE',
               url: this.apiPath + '/' + todo.todoId
            });
        }
        
        function markComplete(todoId){
            return $http({
                method: 'POST',
                url: this.apiPath,
                data: {id: todoId}
            });
        }
    }
})();