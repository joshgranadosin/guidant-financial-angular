var controllers = angular.module('GFCtrls', ['GFServices']);

controllers.controller('TableCtrl', ['$scope', function($scope){
	$scope.testdata = {
		user: "Josh Granadosin",
		data: [
			{symbol:'GOOGL', type:'stock', shares:100, price:30},
			{symbol:'MSFT', type:'stock', shares:50, price:10},
			{symbol:'BNDS', type:'bond', shares:25, price:100},
			{symbol:'FDFX', type:'funds', shares:10, price:20}
		]
	};


}])