(function() {
	'use strict';

	angular
		.module('restaurant.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = [
		'$scope', '$stateParams', '$state', 'product',
		'ionicToast', 'restaurantCartService', '_', 'localStorageService', '$ionicHistory'];

	/* @ngInject */
	function ProductController($scope, $stateParams, $state, product,
	                           ionicToast, restaurantCartService, _, localStorageService, $ionicHistory) {

		$ionicHistory.removeBackView();

		var vm = angular.extend(this, {
			lengthCart: restaurantCartService.lengthCart(),
			product: product,
			addToCart: addToCart,
			quickAddToCart: quickAddToCart,
			showCart: showCart,
			hasStandardOptions: false,
			hasExtraOptions: false
		});

		(function activate() {
			$scope.$on('$ionicView.enter', function() {
				
			});
		})();

		// **********************************************

		function quickAddToCart() {
			addToCart(1);
			ionicToast.show('O produto ' + vm.product.desProduto + ' foi adicionado ao pedido.', 'bottom', false, 5000);
		}

		function showCart() {
			$state.go('app.restaurant-cart');
		}

		function addToCart(quantity) {
			var quantidadeAnterior = restaurantCartService.lengthCart();
			restaurantCartService.addToCart({
				quantity: quantity,
				name: vm.product.desProduto,
				idProduto: vm.product.idProduto,
				qtdLoteMinimo: vm.product.qtdLoteMinimo,
				qtdMultiplo: vm.product.qtdMultiplo
			}).then(function(data) {
				vm.lengthCart = data;

				if (quantidadeAnterior != data) {
					$state.go('app.restaurant-cart');
				}
			});
		}
	}
})();
