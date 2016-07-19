var controllers = angular.module('GFCtrls', ['GFServices', 'googlechart','ui.bootstrap']);
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
controllers.controller('AdminCtrl', ['$scope', 'GFAPI', '$http', '$uibModal',
function($scope, GFAPI, $http, $uibModal){
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

	// modal
	$scope.editSecurity = false;

  $scope.modal = function(index){
  	if(index === -1){
  		$scope.editSecurity = false;
  	}
  	else{
  		$scope.editSecurity = {
  			user: $scope.email,
  			type: $scope.data[index].type,
  			symbol: $scope.data[index].symbol,
  			price: $scope.data[index].price,
  			shares: $scope.data[index].shares,
  			value: $scope.data[index].value
  		}
  	}

    modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/modal.html' ,
      controller: 'ModalCtrl'
    }).result.finally(function(){
    	console.log('closed!');
    	$scope.lookup();
    });

    console.log(modalInstance);


  };

}]);

controllers.controller('ModalCtrl', ['$scope', '$http', '$uibModalInstance', 'GFAPI',
function($scope, $http, $uibModalInstance, GFAPI){
	$scope.admin = GFAPI.confirmAdmin();

	$scope.security = {
		user: GFAPI.getUser(),
		type: 'STOCK',
		symbol: null,
		price: null,
		shares: null,
		value: 'auto'
	}

	console.log($scope.$parent.editSecurity);

	if($scope.$parent.editSecurity){
		$scope.security = $scope.$parent.editSecurity;
	}

	$scope.addNewSecurity = function(){
		console.log($scope.security)
		if(!($scope.security.symbol && $scope.security.symbol && $scope.security.shares)){return}

		$http({
			method:'POST',
			url: '/admin/' + $scope.admin,
			data: $scope.security,
		}).then(function(){
			console.log('Added new security')
			$scope.closeModal();
		});
	}

	// closes modal
	$scope.closeModal = function(){
		$uibModalInstance.close();
	}

}])

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