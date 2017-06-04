'use strict';

/**
 * @ngdoc function
 * @name hernanhApp.controller:MedicosCtrl
 * @description
 * # MedicosCtrl
 * Controller of the hernanhApp
 */
angular.module('saltalacaif')

  .controller('MedicosCtrl', function ($scope, $rootScope, Pulsomovil, $state, horasmedicas, $timeout, $mdSidenav) {

    var rut_paciente = window.localStorage.getItem('rut_paciente');
    $scope.imagePath = 'images/icons/icon.png';
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function () {
              console.log(componentId);
        $mdSidenav(componentId).toggle();
      };
    }
    
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var año = fechaActual.getFullYear();
    var hora = fechaActual.getHours();
    var minutes = fechaActual.getMinutes();
    var seconds = fechaActual.getSeconds()
    var ultimo_ingreso = año + '/' + mes + '/' + dia + ' ' + hora + ':' + minutes + ':' + seconds
    var fechasend = año + '/' + mes + '/' + dia
    var MyVersion = '1.9.7';
    $scope.holidaydate = fechasend;

    $timeout(() => {
      horasmedicas.getMedicos().then(res => {
        console.log(res)

        $scope.medicos = res
        $scope.ok = true


      })
    }, 3000)

    $scope.Horasmedicas = function (Profesional) {
      console.log(Profesional)
      //horasmedicas.setDatahora(horas);
      $state.go('horas', {
        Profesional: Profesional
      });
    }

    $scope.cerrarsesion = function () {
      firebase.auth().signOut().then(function () {
        window.localStorage.removeItem('rut_paciente');
        $state.go('inicio', {
          reload: true
        });
      }, function (error) {
        console.log(error);
      });
    }
  });
