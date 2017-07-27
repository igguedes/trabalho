app.controller('MainCtrl', function($scope, Utils, $http){


	$http.get('/usuarios').then(function(response){
		console.log(response);
	})
	.catch(function(error){
		console.log(error);
	});
});