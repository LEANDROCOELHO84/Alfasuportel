var app = angular.module('alfasuportel', []);
app.controller('itemProdutoController', function($scope, $http, $sce){

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

	// Menu 
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
	
	$scope.loadProduto = function() {
		$scope.produto = [];
		$http.get(baseUrlApi()+"produtos?pro->id="+params.produto).then(function(response){
			$scope.produto = response.data.produtos[0];
			$scope.descricao = $sce.trustAsHtml(response.data.produtos[0].descricao);
		}, function(err){
			console.log(err);
		});
	};

	$scope.loadProduto();

	$scope.loadProdutosRelacionados = function() {
		$scope.relacionados = [];

		$http.get(baseUrlApi()+"produtos?cat->id="+$scope.produto.id_categoria).then(function(response){
			$scope.relacionados = response.data.produtos;
		}, function(err){
			console.log(err);
		});
	};

	$scope.loadProdutosRelacionados();
});