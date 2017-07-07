var app = angular.module('Web2', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: 'views/login.html'
		})
		.state('cadastro',{
			url: '/cadastro',
			templateUrl: 'views/cadastro.html'
		})
		.state('main',{
			url:'',
			templateUrl: 'views/main.html',
			controller: function($scope, $location){
				$scope.isRouteActive = function(url){
					return $location.path() == url;
				}
			}
		})
		.state('main.home',{
			url:'/',
			templateUrl: 'views/home.html'
		})
		.state('main.usuarios',{
			url:'/usuarios',
			templateUrl: 'views/usuarios.html'
		})
		.state('main.notificacoes',{
			url:'/notificacoes',
			templateUrl: 'views/notificacoes.html'
		});
});