(function() {
	'use strict';

	angular
		.module('restaurant.home')
		.factory('loginService', loginService);

	loginService.$inject = ['$state', 'dataService', 'ionicToast', 'localStorageService', 'restaurantCartService'];

	/* @ngInject */
	function loginService($state, dataService, ionicToast, localStorageService, restaurantCartService) {
		var service = {
			entrar: entrar,
			recuperarSenha: recuperarSenha
		};
		return service;

		// ***************************************************************

		function entrar(login, senha, deviceId) {
			dataService.entrar(login, senha, deviceId).then(function(data) {
				if (data != null && data != '') {
					restaurantCartService.flush();
					localStorageService.set('usuarioAutenticado', data);
					$state.go('app.home'); 
				} else {
					ionicToast.show('Login ou senha incorretos!', 'bottom', false, 2000);
				}
			});
		}

		function recuperarSenha(email) {
			dataService.recuperarSenha(email).then(function(data) {
				if (data != null && data != '') {
					$state.go('app.login'); 
					ionicToast.show('O link de recuperação de senha foi enviado para o seu e-mail!', 'bottom', false, 2000);
				} else {
					ionicToast.show('E-mail incorreto!', 'bottom', false, 2000);
				}
			});
		}
	}
})();

