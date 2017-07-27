app.controller('UserCtrl', function($scope, User, $state){

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
				localStorage.setItem('web_token', response.data.token);
				toastr.success('Logado com sucesso!');
				$state.go('main.home');
			})
			.catch(function(error){
				toastr.error('Falha no Login');
			});
	}
});