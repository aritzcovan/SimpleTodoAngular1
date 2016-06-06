(function () {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$scope', 'TodoService'];

    function TodoController($scope, _todoService) {
        var vm = this;
        vm.todos = [];
        vm.creating = false;
        vm.editing = false;
        vm.selectedTodo = undefined;

        //methods
        vm.createTodo = createTodo;
        vm.saveTodo = saveTodo;
        vm.editTodo = editTodo;
        vm.updateTodo = updateTodo;
        vm.deleteTodo = deleteTodo;
        vm.markComplete = markComplete;
        vm.showNew = showNew;
        vm.cancel = cancel;
        vm.headerClick = headerClick;
        vm.collapsed = false;

        //make a call to get the data we need for the page to be displayed correctly
        activate();

        ////////////////

        function activate() {
            _todoService.getTodoList()
                .then(function (response) {
                    vm.todos = response.data;
                }, function (error) {
                    console.log('error occurred' || error);
                });
        }

        function createTodo() {
            vm.creating = true;
        }

        function saveTodo() {
            console.log(vm.newTodo);
            _todoService.createTodo(vm.newTodo)
                .then(function (response) {
                    activate();
                    vm.creating = false;
                }, function (error) {

                })
        }

        function editTodo(todo) {
            vm.selectedTodo = angular.copy(todo);
            vm.editing = true;
        }

        function updateTodo() {
            _todoService.updateTodo(vm.selectedTodo)
                .then(function (response) {
                    vm.selectedTodo = undefined;
                    vm.editing = false
                    activate();
                }, function (error) {
                    console.log('error updating todo ' + error)
                });
        }

        function deleteTodo(todo) {
            _todoService.deleteTodo(todo)
                .then(function (response) {
                    var index = vm.todos.indexOf(todo);
                    vm.todos.splice(index, 1);
                }, function (error) {
                    console.log('error deleting ' + error);
                })
        }

        function markComplete(todo) {
            _todoService.markComplete(todo)
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });
        }

        function showNew() {
            if (vm.creating || vm.editing) {
                return false;
            }
            return true;
        }
        
        function cancel() {
            vm.editing = false;
            vm.creating = false;
            vm.selectedTodo = undefined;
        }
        
        function headerClick() {
            vm.collapsed = !vm.collapsed;
        }
    }

})();