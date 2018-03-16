var app = angular.module('alfasuportel', []);
app.controller('subcategoriaController', function($scope, $http){

	// GET Params by URL

	function getUrlVars() {
		if(window.location.href.indexOf('?') != -1) {
			var vars = {}, hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars[hash[0]] = hash[1];
			}

			return vars;
		}
		else
			return null;
	}

	var params = getUrlVars();

	// Menu Start

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
	
	$scope.loadCategorias();

	$scope.loadSubcategoriasByCategorias = function() {
		$scope.itens = [];

		$http.get(baseUrlApi()+"categorias?id_pai="+params.categoria).then(function(response){
			$scope.itens = response.data.categorias;
		}, function(err){
			console.log(err);
		});
	};
	$scope.loadSubcategoriasByCategorias();

	$scope.loadTitulo = function() {
		$http.get(baseUrlApi()+"categorias?cat->id="+params.categoria).then(function(response){
			$scope.titulo = response.data.categorias[0].descricao_categoria;
		}, function(err){
			console.log(err);
		});
	};
	$scope.loadTitulo();
});