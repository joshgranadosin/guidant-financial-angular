var app = angular.module('GFApp', ['GFCtrls', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){

	// redirect to login page
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('login', {		//login page, also root
		url: '/',
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.state('main', {		//main page shows securities
		url: '/main',
		templateUrl: 'views/table.html',
		controller: 'MainCtrl'
	})

	// enables browser button
 	$locationProvider.html5Mode(true);
}]);