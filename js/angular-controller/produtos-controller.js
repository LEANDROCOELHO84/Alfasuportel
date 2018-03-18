var app = angular.module('alfasuportel', []);
app.controller('produtosController', function($scope, $http){

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
	
	// Banner

	$scope.loadCategoriaProduto = function() {
		$http.get(baseUrlApi()+"categorias?cat->id="+params.subcategoria).then(function(response){
			$scope.categoria_produto = response.data.categorias[0];
		}, function(err){
			console.log(err);
		});
	};

	// Itens Body
	
	$scope.loadItens = function() {
		$scope.itens = [];

		$http.get(baseUrlApi()+"produtos?cat->id="+params.subcategoria).then(function(response){
			$scope.itens = response.data.produtos;
		}, function(err){
			console.log(err);
		});
	};
	
	$scope.loadCategorias();
	$scope.loadCategoriaProduto();
	$scope.loadItens();
});