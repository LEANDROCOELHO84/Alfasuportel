var app = angular.module('alfasuportel', []);
app.controller('indexController', function($scope, $http){

	$scope.loadCategorias = function() {
		$scope.categorias = [];
		$scope.subcategorias = [];

		$http.get(baseUrlApi()+"categorias/treeview?tce->id_empreendimento=217").then(function(response){
			$scope.categorias = response.data;
			$scope.subcategorias = response.data.filhos;
		}, function(err){
			console.log(err);
		});
	}
	$scope.loadCategorias();

});