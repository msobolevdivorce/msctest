var core = angular.module('msc.core');

core.config(configure);

configure.$inject = ['$stateProvider', '$urlRouterProvider'];

function configure($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/index');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html'
    })
    .state('calculator', {
        url: '/calculator',
        templateUrl: 'app/calculator/calculator.html'
    })
    .state('calculator.input', {
        url : '/input',
        templateUrl: 'app/calculator/input.html'
    })
    .state('calculator.result', {
        url : '/result',
        templateUrl: 'app/calculator/results.html'
    });
}