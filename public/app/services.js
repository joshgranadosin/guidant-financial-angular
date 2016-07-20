var services = angular.module('GFServices', []);

// factory for logging in and getting securities data
services.factory('GFAPI', ['$http', '$state', '$window', function($http, $state, $window){
	var currentUser = null;
	var currentData = null;
	var administrator = null;

	return {
		login: function(user, password){
			this.lookup(user, function(){$state.go('main');})
		},
		logout: function(){
			currentUser = null;
			currentData = null;
			administrator = null;
			$state.go('login');
		},
		getUser: function(){
			return currentUser;
		},
		getData: function(){
			return currentData;
		},
		lookup: function(user, next){
			if(!user){
				return;
			}

			$http.get('/user/' + user).then(
				function(res){
					console.log('success', res);
					currentUser = res.data.email;
					currentData = res.data.securities;
					console.log(currentUser,currentData);
					next();
				},
				function(res){
					console.log('error', res);
					swal('Invalid Login', 'Portfolio email not found.', 'error');
				}
			);
		},
		adminLogin: function(admin, password){
			if(!admin){
				return;
			}

			$http.get('/admin/' + admin).then(
				function(res){
					console.log('success', res);
					administrator = res.data.email;
					$state.go('admin');
				},
				function(res){
					console.log('error', res);
					swal('Invalid Login', 'Administrator login not found.', 'error');
				}
			)
		},
		confirmAdmin: function(){
			return administrator;
		},
		editSecurity: false
	}
}]);