app.factory('User', function($http){

	function insert(params){
		return $http.post('/usuario',params);
	}

	function login(params){
		return $http.post('/login', params);
	}

	return{
		insert: insert,
		login: login
	}
});