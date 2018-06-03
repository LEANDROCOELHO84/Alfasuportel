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
	
	// Load Subcategory by Category
	
	$scope.loadSubcategoriasByCategorias = function() {
		$scope.itens = [];

		$http.get(baseUrlApi()+"categorias?tce->id_empreendimento=217&id_pai="+ params.categoria +"&recursively=1")
			.then(
				function(response){
					$scope.itens = response.data.categorias;
					angular.forEach($scope.itens, function(x,y){
						if(x.pth_thumbnail != null)
							x.pth_thumbnail = x.pth_thumbnail.substring(x.pth_thumbnail.indexOf('assets'), x.pth_thumbnail.length);
						else
						x.pth_thumbnail = '/path/to/sample/image.png';

						if(x.pth_banner != null)
							x.pth_banner = x.pth_banner.substring(x.pth_banner.indexOf('assets'), x.pth_banner.length);
						else
							x.pth_banner = '/path/to/sample/image.png';

						if (x.filhos == null) {
							$http.get(baseUrlApi()+"produtos?cat->id="+x.id).then(function(response){
								x.produtos = [];
								x.produtos = response.data.produtos;
							}, function(err){
								console.log(err);
							});
						}

						if (x.filhos != null) {
							angular.forEach(x.filhos, function(a,b){
								if(a.pth_thumbnail != null)
									a.pth_thumbnail = a.pth_thumbnail.substring(a.pth_thumbnail.indexOf('assets'), a.pth_thumbnail.length);
								else
									a.pth_thumbnail = '/path/to/sample/image.png';
							});
						}
					});
				}, function(err){
					console.log(err);
				}
			);

	}

	// Banner

	$scope.loadCategoriaPai = function() {
		$http.get(baseUrlApi()+"categorias?cat->id="+params.categoria).then(function(response){
			$scope.categoria_pai = response.data.categorias[0];
			$scope.categoria_pai.banner = $scope.categoria_pai.pth_banner.substring($scope.categoria_pai.pth_banner.indexOf('assets'), $scope.categoria_pai.pth_banner.length);
		}, function(err){
			console.log(err);
		});
	};

	$scope.teste = "http://via.placeholder.com/1240x768";

	$scope.loadCategorias();
	$scope.loadSubcategoriasByCategorias();
	$scope.loadCategoriaPai();
});