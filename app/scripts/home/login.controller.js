(function() {
	'use strict';

	angular
		.module('restaurant.home')
		.controller('LoginController', LoginController);

	LoginController.$inject = [$rootScope, '$ionicPopup', '$state', 'ionicToast', 'loginService', '$ionicSideMenuDelegate','$ionicHistory', 'localStorageService'];

	/* @ngInject */
	function LoginController($rootScope, $ionicPopup, $state, ionicToast, loginService, $ionicSideMenuDelegate, $ionicHistory, localStorageService) {
		
		$ionicSideMenuDelegate.canDragContent(true);

		$ionicHistory.nextViewOptions({
		  disableAnimate: true,
		  disableBack: true,
		  historyRoot: true
		});

		var vm = angular.extend(this, {
			entrar: entrar,
			openRecuperarSenhaModal: openRecuperarSenhaModal
		});

		(function activate() {
			
		})();

		// ******************************************************

		function entrar(form) {
			angular.forEach(form, function(obj) {
				if (angular.isObject(obj) && angular.isDefined(obj.$setDirty)) {
					obj.$setDirty();
				}
			})

			if (!form.$valid) {
				return;
			}

			var senha = form.senha.$modelValue;
			loginService.entrar(form.login.$modelValue.toUpperCase(), senha, localStorageService.get('registrationId'));
		}

		function openRecuperarSenhaModal() {
			var popup = createRecuperarSenhaPopup();

			return $ionicPopup.show(popup).then(function(result) {
				if (result != null && result.canceled) {
					return;
				}
			});
		}

		function createRecuperarSenhaPopup() {
			var scope = $rootScope.$new();
			scope.data = {
				
			};

			return {
				templateUrl: 'scripts/home/recuperar-senha.html',
				title: 'Recuperar Senha',
				scope: scope,
				buttons: [{
					text: 'Recuperar Senha',
					type: 'button-positive',
					onTap: function(e) {
						recuperarSenha(scope.data);
					}
				} , {
					text: 'Cancelar',
					onTap: function(e) {
						scope.data.canceled = true;
						return scope.data;
					}
				}]
			};
		}

		function recuperarSenha(data) {
			if (data.email == null || data.email == '') {
				ionicToast.show('O campo e-mail é obrigatório.', 'bottom', false, 8000);
				openRecuperarSenhaModal();
				return;
			}
			loginService.recuperarSenha(data.email);
		}
	}
})();

