'use strict';

/**
 * @ngdoc overview
 * @name hernanhApp
 * @description
 * # hernanhApp
 *
 * Main module of the application.
 */
angular

  .module('saltalacaif', [

    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngMaterial',
    'ng-mfb',
    'mdo-angular-cryptography'
  ])

  .config(['$cryptoProvider', function($cryptoProvider) {
    $cryptoProvider.setCryptographyKey('SALTALA');
  }])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
    $stateProvider
      .state('inicio', {
        url: '/',
        templateUrl: 'views/inicio.html',
        controller: 'InicioCtrl',
        controllerAs: 'inicio',
        resolve: {
          next: function ($location) {
            var rut = window.localStorage.getItem('rut_paciente')
            if (rut != undefined) {
              console.log(rut);
              $location.path('/medicos');
            }
          }
        }
      })

      .state('config', {
        url: '/configuracion',
        templateUrl: 'views/configuracion.html',
        controller: 'ConfiguracionCtrl',
        controllerAs: 'configuracion'

      })

      .state('registro', {
        url: '/registro',
        templateUrl: 'views/registro.html',
        controller: 'RegistroCtrl',
        controllerAs: 'registro',
        resolve: {
          next: function ($location) {
            var rut = window.localStorage.getItem('rut_paciente')
            if (rut == undefined) {
              console.log(rut);
              $location.path('/inicio');
            }
          }
        }

      })

      // en veremos si usar o no
      .state('mishoras', {
        url: '/mishoras',
        templateUrl: 'views/mishoras.html',
        controller: 'MishorasCtrl',
        controllerAs: 'mishoras'

      })
      .state('medicos', {
        url: '/medicos',
        templateUrl: 'views/medicos.html',
        controller: 'MedicosCtrl',
        controllerAs: 'medicos',
        resolve: {
          next: function ($location) {
            var rut = window.localStorage.getItem('rut_paciente')
            if (rut == undefined) {
              console.log(rut);
              $location.path('/inicio');
            }
          }
        }
      })
      .state('horas', {
        url: '/horas/:Profesional',
        templateUrl: 'views/horas.html',
        controller: 'HorasCtrl',
        controllerAs: 'horas',
        resolve: {
          next: function ($location) {
            var rut = window.localStorage.getItem('rut_paciente')
            if (rut == undefined) {
              console.log(rut);
              $location.path('/inicio');
            }
          }
        }
      })

    $urlRouterProvider.otherwise('/');


  });
