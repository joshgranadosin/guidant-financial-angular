var controllers = angular.module('GFCtrls', ['GFServices', 'googlechart']);
// Controller for login page
controllers.controller('LoginCtrl', ['$scope', 'GFAPI',
function($scope, GFAPI){
	$scope.email = '';
	$scope.password = '';

	$scope.login = function(){
		GFAPI.login($scope.email, $scope.password);
	}

	$scope.adminLogin = function(){
		GFAPI.adminLogin($scope.email, $scope.password);
	}
}]);

// Controller for admin
controllers.controller('AdminCtrl', ['$scope', 'GFAPI', '$http',
function($scope, GFAPI, $http){
	$scope.admin = GFAPI.confirmAdmin();
	$scope.show = false;

	// logout
	$scope.logout = function(){
		GFAPI.logout();
	}

	// lookup the data for a portfolio
	$scope.email = '';
	$scope.data = null;
	$scope.values = [];
	$scope.valuesTotal = 0;

	$scope.lookup = function(){
		GFAPI.lookup($scope.email, function(){
			$scope.email = GFAPI.getUser();
			$scope.data = GFAPI.getData();
			$scope.show = true;
			calcAll();
		})
	}

	// reset values when it's closed
	$scope.close = function(){
		$scope.email = '';
		$scope.data = null;
		$scope.values = [];
		$scope.valuesTotal = 0;
		$scope.show = false;
	}
	
	// calculates each value, declared not called to be re-used
	function calcVal(s){
		if(s.value !== 'auto'){return s.value}
		if(s.type === 'STOCK'){return s.shares * s.price}
		else if(s.type === 'BOND'){return s.shares * s.price * 0.8}
		else if(s.type === 'FUND'){return s.shares * s.price * 0.6}
	}

	// calculates all values, declared not called to be re-used
	function calcAll(){
		$scope.valuesTotal = 0;
		$scope.data.forEach(function(s){
			var num = calcVal(s)
			$scope.values.push(num);
			$scope.valuesTotal += num;
		});
	}

	$scope.newType = 'STOCK';
	$scope.newSymbol = '';
	$scope.newPrice = 1;
	$scope.newShares = 1;
	$scope.newValue = 'auto'

	$scope.addNewSecurity = function(){
		console.log('Adding new security');
		$http({
			method:'POST',
			url: '/admin/' + $scope.admin,
			data:{
				user: $scope.email,
				type: $scope.newType,
				symbol: $scope.newSymbol,
				price: $scope.newPrice,
				shares: $scope.newShares,
				value: $scope.newValue
			}
		}).then(function(){
			console.log('Added new security')
			$scope.lookup()
		});
	}

}]);

// Controller for main page
controllers.controller('MainCtrl', ['$scope', '$state', '$window', 'GFAPI',
function($scope, $state, $window, GFAPI){
	// logout
	$scope.logout = function(){
		$state.go('login');
	}

	// get data from factory
	$scope.email = GFAPI.getUser();
	$scope.data = GFAPI.getData();

	// required declaration for charts
	$scope.values = [];
	$scope.stockVal = 0;
	$scope.bondVal = 0;
	$scope.fundVal = 0;

	// calculates each value, declared not called to be re-used
	function calcVal(s){
		if(s.value !== 'auto'){return s.value}
		if(s.type === 'STOCK'){return s.shares * s.price}
		else if(s.type === 'BOND'){return s.shares * s.price * 0.8}
		else if(s.type === 'FUND'){return s.shares * s.price * 0.6}
	}

	// calculates all values, declared not called to be re-used
	function calcAll(){
		$scope.stockVal = $scope.bondVal = $scope.fundVal = 0;
		$scope.data.forEach(function(s){
			var num = calcVal(s)
			$scope.values.push(num);

			if(s.type === 'STOCK'){$scope.stockVal += num}
			else if(s.type === 'BOND'){$scope.bondVal += num}
			else if(s.type === 'FUND'){$scope.fundVal += num}
		});
	}

	// calls above functions
	calcAll();

	// declare pie chart
  $scope.myChartObject = {};
  $scope.myChartObject.type = "PieChart";

  // populate data into pie chart
  $scope.myChartObject.data = {
  	cols: [
      {id: "t", label: "label", type: "string"},
      {id: "s", label: "value", type: "number"}
  	],
  	rows: [
      {c: [
      	{v: "Stocks"},
      	{v: $scope.stockVal}
      	]
      },
      {c: [
      	{v: "Bonds"},
      	{v: $scope.bondVal}
      	]
      },
      {c: [
        {v: "Funds"},
        {v: $scope.fundVal},
      	]
    	}
  	]
	};

	// determine if you want to show percentage or total values
	$scope.pieSliceText = 'percentage';
	$scope.toggleEnabled = true;

	// determine options based on screen size, declared not called so can be re-used when screen is re-sized
	// necessary because chart draw is not part of angular's digest loop and will not be redrawn when info changes
	function redrawPieChart(){

		// options for smaller screen
		if($window.innerWidth < 650){
			$scope.myChartObject.options = {
       title: 'Distribution of Securities',
        titleTextStyle: {fontSize: 16},
        legend: {position:'bottom'},
        pieSliceText: $scope.pieSliceText,
        pieStartAngle: 90
	    };
	    $scope.toggleEnabled = true;
		}

		// options for larger screen
		else{
			$scope.myChartObject.options = {
        title: 'Distribution of Securities',
        titleTextStyle: {fontSize: 24},
        legend: {position:'labeled', labeledValueText: 'both'},
        pieSliceText: 'none',
        pieStartAngle: 90
	    };
	    $scope.toggleEnabled = false;
		}
	}

	// calls above function for the first time
	redrawPieChart();

	// calls again when screen is resized
	angular.element($window).bind('resize', function(){
	  redrawPieChart();
	});

	// calls again when options change
	$scope.togglePie = function(str){
		$scope.pieSliceText = str;
		console.log($scope.pieSliceText)
		redrawPieChart();
	}

}]);