'use strict';

var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            url: '/',
            templateUrl: 'about.html'
        })

        .state('guideline', {
            url: '/:category/:guideline',
            templateUrl: function (stateParams) {
              return stateParams.category + '/' + stateParams.guideline + '.html';
            }
        })
    ;
});
