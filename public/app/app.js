var app = angular.module('GFApp', ['GFCtrls', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('login', {
		url: '/',
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.state('main', {
		url: '/main',
		templateUrl: 'views/table.html',
		controller: 'TableCtrl'
	})

 	$locationProvider.html5Mode(true);
}]);