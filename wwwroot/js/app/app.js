(function() {
    'use strict';
    angular
        .module('app', ['ui.router','app.core'])
        
        .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
                $stateProvider
                    .state('home',
                        {
                            url: '/home',
                            templateUrl: '../js/app/home/home.html',
                            controller: 'HomeController',
                            controllerAs: 'vm'
                        })
                    .state('todo',
                        {
                            url: '/todo',
                            templateUrl: '../js/app/todos/todos.html',
                            controller: 'TodoController',
                            controllerAs: 'vm'
                        });
                        
                    $urlRouterProvider.otherwise('home');
            }
        ])
        .run(function($rootScope) {
            $rootScope.$on("$stateChangeError", console.log.bind(console));
        });
})();


