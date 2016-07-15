var services = angular.module('GFServices', []);

// factory for logging in and getting securities data
services.factory('GFAPI', ['$http', '$state', function($http, $state){
	var currentUser = null;
	var currentData = null;

	return {
		login: function(user,password){
			$http.get('/user/' + user).then(
				function(res){
					console.log('success', res);
					currentUser = res.data.email;
					currentData = res.data.securities;
					console.log(currentUser,currentData);
					$state.go('main');
				},
				function(res){
					console.log('error', res);
					console.log(currentUser,currentData);
				}
			);
		},
		logout: function(){
			currentUser = null;
		},
		getUser: function(){
			return currentUser;
		},
		getData: function(){
			return currentData;
		},
	}
}])