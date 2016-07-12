var controllers = angular.module('GFCtrls', ['GFServices', 'googlechart']);

controllers.controller('TableCtrl', ['$scope', '$window', function($scope, $window){

	// fake data for testing
	$scope.data = [
		{symbol:'GOOGL', type:'STOCK', shares:100, price:30},
		{symbol:'MSFT', type:'STOCK', shares:50, price:10},
		{symbol:'BNDS', type:'BOND', shares:25, price:100},
		{symbol:'FDFX', type:'FUND', shares:10, price:20}
	]

	// required declaration for charts
	$scope.values = [];
	$scope.stockVal = 0;
	$scope.bondVal = 0;
	$scope.fundVal = 0;

	// calculates each value, declared not called
	function calcVal(s){
		if(s.type === 'STOCK'){return s.shares * s.price}
		else if(s.type === 'BOND'){return s.shares * s.price * 0.8}
		else if(s.type === 'FUND'){return s.shares * s.price * 0.6}
	}

	// calculates all values, declared not called
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

	// determine options based on screen size, declared not called
	function redrawPieChart(){
		console.log('redrawing pie');
		if($window.innerWidth < 650){
			$scope.myChartObject.options = {
       title: 'Distribution of Securities',
        legend: {position:'bottom'},
        pieSliceText: $scope.pieSliceText,
        pieStartAngle: 90
	    };
	    $scope.toggleEnabled = true;
		}
		else{
			$scope.myChartObject.options = {
        title: 'Distribution of Securities',
        legend: {position:'labeled', labeledValueText: 'both'},
        pieSliceText: 'none',
        pieStartAngle: 90
	    };
	    $scope.toggleEnabled = false;
		}
	}

	// calls above function, and calls again when screen is resized
	redrawPieChart();
	angular.element($window).bind('resize', function(){
	  redrawPieChart();
	});

	$scope.togglePie = function(str){
		$scope.pieSliceText = str;
		console.log($scope.pieSliceText)
		redrawPieChart();
	}

}])