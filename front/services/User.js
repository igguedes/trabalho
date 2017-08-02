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

	function seguir(id_seguidor, id_seguindo, params){
		return $http.post('/back/seguir/seguidor/'+id_seguidor+'/seguindo/' + id_seguindo, params);
	}

	function listarNotificacoes(id_usuario){
		return $http.get('/back/notificacoes/usuario/' + id_usuario);
	}

	function listarAmigos(id){
		return $http.get('/back/lista_seguindo/'+ id);
	}

	function enviarMensagem(params){
		return $http.post('/back/postagens', params);
	}

	function listarPostagens(){
		return $http.get('/back/postagens');
	}

	return{
		insert: insert,
		login: login,
		getAll: getAll,
		uploadImage: uploadImage,
		seguir: seguir,
		listarNotificacoes: listarNotificacoes,
		listarAmigos: listarAmigos,
		enviarMensagem: enviarMensagem,
		listarPostagens: listarPostagens
	}
});