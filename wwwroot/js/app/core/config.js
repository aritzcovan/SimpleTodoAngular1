(function() {
    'use strict';

    var core = angular.module('app.core');
    
        // .config(['toastr', function(toastr){
        //     toastr.options.timeOut = 4000;
        //     toastr.options.positionClass = 'toast-bottom-right';   
        // }]);
           
    core.config(toastrConfig);
    
    toastrConfig.$inject = ['toastr'];
    
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }
    
    //core.value('config', config);
})();