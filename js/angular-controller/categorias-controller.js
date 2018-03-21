var app = angular.module('alfasuportel', []);
app.controller('categoriasController', function($scope, $http){

	// Menu Header
	
	$scope.loadCategorias = function() {
		$scope.categorias = [];
		$scope.subcategorias = [];

		$http.get(baseUrlApi()+"categorias/treeview?tce->id_empreendimento=217").then(function(response){
			$scope.categorias = response.data;
			angular.forEach($scope.categorias, function(item, index){
				item.thumbnail = item.pth_thumbnail.substring(item.pth_thumbnail.indexOf('assets'), item.pth_thumbnail.length);
			})
		}, function(err){
			console.log(err);
		});
	};

	$scope.loadSubCategorias = function(item){
		$scope.subcategorias = [];
		if (item.filhos != null) {
			$scope.subcategorias = item.filhos
		}
	};
	
	$scope.loadCategorias();
});