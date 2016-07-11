var app = angular.module('GFApp', ['GFCtrls', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'views/table.html',
		controller: 'TableCtrl'
	})

 	$locationProvider.html5Mode(true);
}]);