var app = angular.module('alfasuportel', []);
app.controller('indexController', function($scope, $http){

	// Menu Header
 
	$scope.loadCategorias = function() {
		$scope.categorias = [];
		$scope.subcategorias = [];

		$http.get(baseUrlApi()+"categorias/treeview?tce->id_empreendimento=217").then(function(response){
			$scope.categorias = response.data;
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
	
	// Load Category Body

	$scope.loadCategoriasBody = function() {
		$scope.categorias_body = [];

		$http.get(baseUrlApi()+"categorias/treeview?tce->id_empreendimento=217").then(function(response){
			$scope.categorias_body = response.data;
			angular.forEach($scope.categorias_body,function(item,index){
				item.itens = [];
				$scope.loadItens(item);
			})
		}, function(err){
			console.log(err);
		});
	};

	// Load Product by Category
	
	$scope.loadItens = function(categoria) {
		$http.get(baseUrlApi()+"produtos?cat->id_pai="+categoria.id).then(function(response){
			categoria.itens = response.data.produtos;
		}, function(err){
			console.log(err);
		});
	};

	$scope.loadCategorias();
	$scope.loadCategoriasBody();
});