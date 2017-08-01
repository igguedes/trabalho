app.controller('UserCtrl', function($scope, User, $state, $location, Utils){
	$scope.usuarios = [];
	$scope.usuario = JSON.parse(localStorage.getItem('usuario'));
	$scope.usuario && ($scope.my_id = $scope.usuario.id);
	$scope.notificacoes = [];
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

	$scope.lerNotificacoes();

	if($location.path() != '/cadastro'){
		$scope.listarUsuarios();
	}
});