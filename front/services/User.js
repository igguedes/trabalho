app.factory('User', function($http){

	function insert(params){
		return $http.post('/usuario',params);
	}

	function login(params){
		return $http.post('/login', params);
	}

	function getAll(params){
		return $http.get('/usuarios?pesquisa=' + params);
	}

	return{
		insert: insert,
		login: login,
		getAll: getAll
	}
});