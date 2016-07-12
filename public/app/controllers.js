var controllers = angular.module('GFCtrls', ['GFServices', 'googlechart']);

controllers.controller('TableCtrl', ['$scope', function($scope){
	$scope.data = [
		{symbol:'GOOGL', type:'STOCK', shares:100, price:30},
		{symbol:'MSFT', type:'STOCK', shares:50, price:10},
		{symbol:'BNDS', type:'BOND', shares:25, price:100},
		{symbol:'FDFX', type:'FUND', shares:10, price:20}
	]

	$scope.values = [];
	$scope.stockVal = 0;
	$scope.bondVal = 0;
	$scope.fundVal = 0;

	function calcVal(s){
		if(s.type === 'STOCK'){return s.shares * s.price}
		else if(s.type === 'BOND'){return s.shares * s.price * 0.8}
		else if(s.type === 'FUND'){return s.shares * s.price * 0.6}
	}

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

	calcAll();

/* pie options */
	  $scope.myChartObject = {};
    
    $scope.myChartObject.type = "PieChart";

    $scope.myChartObject.data = {
    	cols: [
        {id: "t", label: "label", type: "string"},
        {id: "s", label: "value", type: "number"}
    	],
    	rows: [
        {c: [
        	{v: "Value of Stocks: " + $scope.stockVal},
        	{v: $scope.stockVal}
        	]
        },
        {c: [
        	{v: "Value of Bonds: " + $scope.bondVal},
        	{v: $scope.bondVal}
        	]
        },
        {c: [
          {v: "Value of Funds: " + $scope.fundVal},
          {v: $scope.fundVal},
        	]
      	}
    	]
  	};

    $scope.myChartObject.options = {
        title: 'Distribution of Securities',
        legend: {position:'labeled'},
        pieSliceText: 'none'
    };

}])