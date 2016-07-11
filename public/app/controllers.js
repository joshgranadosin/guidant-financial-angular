var controllers = angular.module('GFCtrls', ['GFServices']);

controllers.controller('TableCtrl', ['$scope', function($scope){
	$scope.test = 'test';
}])