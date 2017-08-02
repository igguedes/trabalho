app.controller('UserCtrl', function($scope, User, $state, $location, Utils){
	$scope.usuarios = [];
	$scope.usuario = JSON.parse(localStorage.getItem('usuario'));
	$scope.usuario && ($scope.my_id = $scope.usuario.id);
	$scope.notificacoes = [];
	$scope.postagens = [];
	$scope.insert = function(dados){
		delete dados.senha2;
		User.insert(dados)
			.then(function(response){
				toastr.success("Cadastrado com sucesso");
				$state.go('login');
			})
			.catch(function(error){
				toastr.error(error.data.msg);
			});
	}

	$scope.login = function(credenciais){
		User.login(credenciais)
			.then(function(response){
				localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
				localStorage.setItem('web_token', response.data.token);
				toastr.success('Logado com sucesso!');
				$scope.listarAmigos(response.data.usuario.id);
				$state.go('main.home');
			})
			.catch(function(error){
				toastr.error('Falha no Login');
			});
	}

	$scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl){
	    $scope.listarUsuarios();
	});

	$scope.listarUsuarios = function(){
		if($location.path() != '/cadastro'){
			var pesquisa = $location.search().pesquisa;
			User.getAll(pesquisa)
				.then(function(response){
					$scope.usuarios = response.data;
				})	
				.catch(function(error){
					console.log(error);
				});
		}

	}


	$scope.seguir = function(id){
		User.seguir($scope.my_id, id, {nome: $scope.usuario.nome})
			.then(function(response){
				Utils.socket.emit('evento_seguir', {to: id, mensagem: $scope.usuario.nome + ' comẽçou a seguir você'});
				location.reload();
			})
			.catch(function(error){
				console.log(error);
			});
	}

	$scope.lerNotificacoes = function(){
		User.listarNotificacoes($scope.usuario.id)
		.then(function(response){
			$scope.notificacoes = response.data;
		})
		.catch(function(error){
			console.log(error);
		});
	}

	$scope.listarAmigos = function(){
		User.listarAmigos($scope.usuario.id)
			.then(function(response){
				console.log(response);
				setAmigos(response.data);
			})
			.catch(function(error){
				console.log(error);
			});
	}

	function setAmigos(array){
		var ids = array.map(function(item){
			return item.id_seguindo
		});
		localStorage.setItem('seguindo', JSON.stringify(ids));
		console.log(getAmigos());
	}

	$scope.enviarMensagem = function(mensagem){
		User.enviarMensagem({usuario_id: $scope.usuario.id, texto: mensagem})
		.then(function(response){
			Utils.socket.emit('nova_postagem', {
				id: $scope.usuario.id,
				nome: $scope.usuario.nome
			});
			toastr.success('Postado com sucesso!');
		})
		.catch(function(error){
			toastr.error(error.data.msg);
		})
	}

	$scope.listarPostagens = function(){
		User.listarPostagens()
		.then(function(response){
			$scope.postagens = response.data;
		})
		.catch(function(error){
			toastr.error('Falha ao listar postagens');
		})
	}

	function getAmigos(){
		return JSON.parse(localStorage.getItem('seguindo')) || [];
	}

	$scope.canFollow = function(row){
		if(getAmigos().indexOf(row) == -1){
			return true;
		}
		return false;
	}

	$scope.canShow = function(row){
		var amigos = getAmigos();
		return amigos.some(function(amigo){
			return amigo == row;
		});
	}

	if($location.path() == '/notificacoes'){
		$scope.lerNotificacoes();
	}

	if($location.path() == '/usuarios'){
		$scope.listarAmigos();
	}

	if($location.path() == '/home'){
		$scope.listarPostagens();
	}
	
	if($location.path() != '/cadastro'){
		$scope.listarUsuarios();
	}

	Utils.socket.on('nova_postagem', function(data){
		if($scope.canShow(data.id)){
			$scope.listarPostagens();
			toastr.info(data.nome + ' Acabou de fazer uma postagem!');
		}

	});
});