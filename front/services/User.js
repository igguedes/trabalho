app.factory('User', function($http){

	function insert(params){
		return $http.post('/back/usuario',params);
	}

	function login(params){
		return $http.post('/back/login', params);
	}

	function getAll(params){
		return $http.get('/back/usuarios?pesquisa=' + params);
	}

	function uploadImage(params){
		return $http.put('/back/foto', params);
	}

	return{
		insert: insert,
		login: login,
		getAll: getAll,
		uploadImage: uploadImage
	}
});