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
	

	// Load Product Data

	$scope.loadProduto = function() {
		$scope.produto = [];
		$http.get(baseUrlApi()+"produtos?pro->id="+params.produto).then(function(response){
			$scope.produto = response.data.produtos[0];
			$scope.produto.images = [{
				path: $scope.produto.img,
				selected: true
			}];

			var id_categoria_referencia = response.data.produtos[0].id_categoria;
			$scope.descricao = $sce.trustAsHtml(response.data.produtos[0].descricao);
			$scope.loadProdutosRelacionados(id_categoria_referencia);
			$scope.loadFotosProduto();
		}, function(err){
			console.log(err);
		});
	};

	$scope.loadFotosProduto = function() {
		$http.get(baseUrlApi()+"produto/fotos/"+$scope.produto.id_produto).then(function(response){
			angular.forEach(response.data, function(foto){
				$scope.produto.images.push({
					path: foto.path.substr(foto.path.lastIndexOf('/')+1, foto.path.length),
					selected: false
				});
			});
		}, function(err){
			console.log(err);
		});
	};

	$scope.getProductSelectedImage = function() {
		// vai retornar um objeto {path: '/path/to/image', selected: true}
		return _.findWhere($scope.produto.images, {selected: true});
	}

	$scope.selectProductImage = function(selected_image) {
		angular.forEach($scope.produto.images, function(image){
			image.selected = false;
		});
		selected_image.selected = true;
	}

	// Load Related Products
	
	$scope.loadProdutosRelacionados = function(id_categoria) {
		$scope.relacionados = [];

		$http.get(baseUrlApi()+"produtos?cat->id="+id_categoria).then(function(response){
			$scope.relacionados = response.data.produtos;
		}, function(err){
			console.log(err);
		});
	};
	
	$scope.loadCategorias();
	$scope.loadProduto();
});