var app = angular.module('Web2', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$httpProvider.interceptors.push(function($q,$injector) {
	      return {
	          'request': function (config) {
		          config.headers = config.headers || {};
		          config.headers.Authorization = localStorage.getItem('web_token');
		          return config;
	      		},
	      		'responseError': function(response) {
		           if(response.status === 401 || response.status === 403) {
		             $injector.get('$state').transitionTo('login');
		           }
		          	return $q.reject(response);
		        }
	      };
    });

	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'UserCtrl'
		})
		.state('cadastro',{
			url: '/cadastro',
			templateUrl: 'views/cadastro.html',
			controller: 'UserCtrl'
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
			templateUrl: 'views/home.html',
			controller: 'MainCtrl'
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