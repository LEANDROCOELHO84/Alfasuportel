var app = angular.module('alfasuportel',[]);
app.controller('categoriasController', function ($scope, $http) {
	$scope.loadCategorias = function() {
		$scope.categorias = [];

		$http.get(baseUrlApi()+"categorias?tce->id_empreendimento=217&id_pai[exp]=is null").then(function(response){
			$scope.categorias = response.data.categorias;
		}, function(err){
			console.log(err);
		});
	}
	$scope.loadCategorias();
});