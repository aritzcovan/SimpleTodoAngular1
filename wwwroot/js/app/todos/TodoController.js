(function () {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$scope', '$state', '$stateParams', 'TodoService', 'logger'];

    function TodoController($scope, $state, $stateParams, _todoService, _logger) {
        var vm = this;
        vm.todos = [];
        vm.selectedTodo = undefined;

        //methods
        vm.createTodo = createTodo;
        vm.saveTodo = saveTodo;
        vm.editTodo = editTodo;
        vm.deleteTodo = deleteTodo;
        vm.cancel = cancel;
        vm.headerClick = headerClick;
        vm.collapsed = false;
        vm.saveIsActive = saveIsActive;
        
        //ui props
        vm.buttonText = '';
        vm.title = '';

        //make a call to get the data we need for the page to be displayed correctly
        activate();

        ////////////////

        function activate() {
            
            //see if the todoId == new
            if($stateParams.todoId === 'new'){
                vm.selectedTodo = {};
                vm.buttonText = 'Create';
                vm.title = 'New todo';
                return;
            }
            
            //check if we have an id in the url, if so, this is an edit
            if($stateParams.todoId) {
                _todoService.getTodoById(+$stateParams.todoId)
                    .then(function(response){
                       vm.selectedTodo = response.data; 
                       vm.buttonText = 'Update';
                       vm.title = 'Edit todo';
                    }, function(error){
                        _logger.error('error getting todo by Id ' + error);
                    });
            
            } else {
                _todoService.getTodoList()
                    .then(function (response) {
                        vm.todos = response.data;
                    }, function (error) {
                        _logger.error('error occurred' || error);
                    });
            }
        }

        function createTodo() {
            $state.go('edittodo', {todoId: 'new'});
        }

        function saveTodo() {
            if($stateParams.todoId === 'new'){
                //this is a new record, create it
                _todoService.createTodo(vm.selectedTodo)
                    .then(function (response) {
                        $state.go('todo');
                    }, function (error) {
                        _logger.error('an error occured trying to create todo ' + error.message);
                    });
            } else {
                //this is an existing record, update it
                 _todoService.updateTodo(vm.selectedTodo)
                    .then(function (response) {
                        vm.selectedTodo = undefined;
                        $state.go('todo');
                    }, function (error) {
                        _logger.error('error updating todo ' + error)
                    });
            }
        }

        function editTodo(todo) {
            $state.go('edittodo', {todoId: todo.todoId});
        }

        function deleteTodo(todo) {
            if (confirm('r u sure?')) {
                _todoService.deleteTodo(todo)
                    .then(function (response) {
                        var index = vm.todos.indexOf(todo);
                        vm.todos.splice(index, 1);
                    }, function (error) {
                        _logger.error('error deleting todo ' + error);
                    })
            }
        }

        function cancel() {
            vm.selectedTodo = undefined;
            $state.go('todo');
        }

        function headerClick() {
            vm.collapsed = !vm.collapsed;
        }

        function saveIsActive() {
            return vm.selectedTodo === undefined;
        }
    }
})();