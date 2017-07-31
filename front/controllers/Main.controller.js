app.controller('MainCtrl', function($scope, Utils, $http, $state, $location, User){

	$scope.isRouteActive = function(url){
		return $location.path() == url;
	}

	$scope.usuario = JSON.parse(localStorage.getItem('usuario'));

	$scope.logout = function (){
		localStorage.removeItem('web_token');
		$location.path('/');
		toastr.warning('Você saiu!');
	}

	function uploadImage(dados){
		User.uploadImage(dados)
			.then(function(response){
				console.log(response);
				toastr.success('Imagem atualizada com sucesso!');
				$scope.usuario.foto = response.data.foto;
				localStorage.setItem('usuario', JSON.stringify($scope.usuario));
			})
			.catch(function(error){
				console.log(error);
				toastr.error('Falha ao atualizar imagem!');
			});
	}

	var handleFileSelect = function (evt) {
		console.log('teste');
		var file = evt.currentTarget.files[0];
		// $scope.myCroppedImageExt = file.name.match(/\.\w+$/)[0];
		var reader = new FileReader();
		reader.onload = function (evt) {
		  $scope.$apply(function ($scope) {
		    $scope.myImage = evt.target.result;
		    var dados = {
		    	foto: evt.target.result,
		    	id: $scope.usuario.id
		    }
		    uploadImage(dados);
		    // console.log($scope.myImage);
		    // $scope.model[$scope.options.key] = file.name;
		    // $scope.model.imageData = $scope.myImage;
		  });
		};
		reader.readAsDataURL(file);
	};
	
	setTimeout(function(){
		angular.element(document.querySelector('#imageUpload')).on('change', handleFileSelect);
	}, 500);

});