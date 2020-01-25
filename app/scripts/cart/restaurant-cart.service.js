(function() {
	'use strict';

	angular
		.module('restaurant.restaurant-cart')
		.factory('restaurantCartService', restaurantCartService);

	restaurantCartService.$inject = ['$rootScope', '$ionicPopup', '$state', '_', 'localStorageService', 'ionicToast', 'dataService', '$filter'];

	/* @ngInject */
	function restaurantCartService($rootScope, $ionicPopup, $state, _, localStorageService, ionicToast, dataService, $filter) {
		var restaurantCartKey = 'restaurant-cart';
		var restaurantCartKeyRemoved = 'restaurant-cart-removed';
		var dataPedidoKey = 'dataPedido';
		var notesKey = 'notes';
		var idPedidoKey = 'idPedido';
		var cart = localStorageService.get(restaurantCartKey) || [];
		var cartRemoved = localStorageService.get(restaurantCartKeyRemoved) || [];

		var service = {
			addToCart: addToCart,
			showMyCart: showMyCart,
			deleteItem: deleteItem,
			changeQuantity: changeQuantity,
			flush: flush,
			getAll: getAll,
			pesquisar: pesquisar,
			preparaAlterarPedido: preparaAlterarPedido,
			inativarPedido: inativarPedido,
			novoPedido: novoPedido,
			lengthCart: lengthCart
		};
		return service;

		// ********************************************************

		function deleteItem(itemToRemove) {
			_.each(cart, function(item) {
				if (item.idProduto == itemToRemove.idProduto) {
					item.flgAtivo = 'N';
					cartRemoved.push(item);
				}
			});
			_.remove(cart, function(item) {
				return item === itemToRemove;
			});

			localStorageService.set(restaurantCartKeyRemoved, cartRemoved);
			localStorageService.set(restaurantCartKey, cart);
		}

		function flush() {
			cart = [];
			cartRemoved = [];
			localStorageService.set(restaurantCartKey, cart);
			localStorageService.set(restaurantCartKeyRemoved, cartRemoved);
		}

		function showMyCart(data) {
			$state.go('app.restaurant-cart');
		}

		function getAll() {
			return cart;
		}

		function lengthCart() {
			return getAll().length;
		}

		function addToCart(cartItem) {
			var achouProduto = false;
			_.each(getAll(), function(item) {
				if (item.idProduto == cartItem.idProduto) {
					achouProduto = true;
				}
			});

			if (!achouProduto) {
				if (cartItem.quantity) {
					saveToCart(cartItem, cartItem.quantity);
					return lengthCart();
				}

				var popup = createAddToCartPopup(cartItem.name, null, cartItem.qtdLoteMinimo, cartItem.qtdMultiplo);

				return $ionicPopup.show(popup).then(function(result) {
					if (result.canceled) {
						return lengthCart();
					}

					saveToCart(cartItem, result.quantity);
					ionicToast.show('O produto ' + cartItem.name + ' foi adicionado ao pedido.', 'bottom', false, 5000);
					return lengthCart();
					
				});
			} else {
				ionicToast.show('O produto ' + cartItem.name + ' já foi adicionado ao pedido.', 'bottom', false, 5000);
				return lengthCart();
			}
		}

		function saveToCart(cartItem, quantity) {
			cartItem.quantity = quantity;
			cart.push(cartItem);
			localStorageService.set(restaurantCartKey, cart);
		}

		function changeQuantity(cartItem) {
			var popup = createAddToCartPopup(cartItem.name, cartItem.quantity, cartItem.qtdLoteMinimo, cartItem.qtdMultiplo);

			return $ionicPopup.show(popup).then(function(result) {
				if (result.canceled) {
					return;
				}

				cartItem.quantity = result.quantity;
				localStorageService.set(restaurantCartKey, cart);
			});
		}

		function createAddToCartPopup(title, quantity, qtdLoteMinimo, qtdMultiplo) {
			var scope = $rootScope.$new();
			scope.data = {
				quantity: quantity || qtdLoteMinimo,
				qtdMultiplo: qtdMultiplo,
				qtdLoteMinimo: qtdLoteMinimo
			};

			return {
				templateUrl: 'scripts/cart/add-to-cart.html',
				title: title,
				scope: scope,
				buttons: [{
					text: '<b>Adicionar</b>',
					type: 'button-positive',
					onTap: function(e) {
						var quantity = parseInt(scope.data.quantity);
						if (quantity > 0) {
							scope.data.quantity = quantity;
							return scope.data;
						} else {
							ionicToast.show('A quantidade do produto não foi preenchida corretamente.', 'bottom', false, 5000);
							e.preventDefault();
						}
					}
				}, {
					text: 'Cancelar',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}]
			};
		}

		function pesquisar(idCliente, dataPedido) {
			return dataService.pesquisar(idCliente, dataPedido).then(function(data) {
				return data;
			});
		}

		function preparaAlterarPedido(data) {
			flush();
			localStorageService.set(dataPedidoKey, $filter('date')(data.pedido.datPedido, 'yyyy/MM/dd', null));
			localStorageService.set(notesKey, data.pedido.obsPedido);
			localStorageService.set(idPedidoKey, data.pedido.idPedido);
			
			_.each(data.listaPedidoProduto, function(item) {
				item.name = item.produto.desProduto;
				item.qtdLoteMinimo = item.produto.qtdLoteMinimo;
				item.qtdMultiplo = item.produto.qtdMultiplo;
				item.flgAtivo = null;
				saveToCart(item, item.qtdSolicitada);
			});
			showMyCart(data);
		}

		function inativarPedido(idCliente, idUsuario, data) {
			return dataService.inativarPedido(idCliente, idUsuario, data.pedido.idPedido)
				.then(function(data) {
				if (data != null && data != '') {
					ionicToast.show('O pedido ' + data.idPedido +' foi inativado com sucesso.', 'bottom', false, 5000);
					$state.go('app.home');
				} else {
					ionicToast.show('O pedido não pode ser inativado, pois excedeu a hora limite de inativação!', 'bottom', false, 5000);
				}
			});	
		}

		function novoPedido() {
			return dataService.novoPedido().then(function(data) {
				flush();

				localStorageService.set(dataPedidoKey, $filter('date')(data.pedido.dataPedido, 'yyyy/MM/dd', null));
				localStorageService.set(notesKey, data.pedido.observacao);
				localStorageService.set(idPedidoKey, data.pedido.idPedido);
			});		
		}
	}
})();
