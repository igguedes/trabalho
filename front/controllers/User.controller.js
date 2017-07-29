app.controller('UserCtrl', function($scope, User, $state, $location){
	$scope.usuarios = [];

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
				console.log(response);
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

	if($location.path() != '/cadastro'){
		$scope.listarUsuarios();
	}
});