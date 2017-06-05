'use strict';

/**
 * @ngdoc function
 * @name hernanhApp.controller:MedicosCtrl
 * @description
 * # MedicosCtrl
 * Controller of the hernanhApp
 */
angular.module('saltalacaif')

  .controller('MedicosCtrl', function ($scope, $rootScope, Pulsomovil, $state, horasmedicas, $timeout, $mdSidenav, Movil,$mdDialog) {

    var rut_paciente = window.localStorage.getItem('rut_paciente');
    $scope.imagePath = 'images/icons/icon.png';
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function () {
        $scope.horasReservadas = [];
        $scope.horaspasadas = [];


              Movil.Datospaciente({
               rut_paciente: rut_paciente
              },function(resp){
                $scope.usuario = resp;
                console.log($scope.usuario);
            });

        Movil.VerHorasMedicas({
          rut_paciente: rut_paciente
        }, function (res) {
          console.log(res);
          for (var i = 0; i < res.length; i++) {
            if (res[i].estado === '1') {
              $scope.horasReservadas.push(res[i]);
            }

            if (res[i].estado === '2') {
              $scope.horaspasadas.push(res[i]);
            }

            if(res[i].estado !== '1'){
              $scope.nohayhoras = true;
            }

          }
        });
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

      $scope.refresh = function(){
            $timeout(() => {
      horasmedicas.getMedicos().then(res => {
        console.log(res)

        $scope.medicos = res
        $scope.ok = true


      })
    }, 3000)
      };


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

        $scope.cancel = function (ev, item) {

      var confirm = $mdDialog.confirm()
        .title('¿Deseas anular tu hora medica?.')
        .textContent('Hoy a las ' + item.Hora + ' con el Médico ' + item.Profesional)
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Anular hora')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function () {

        var pIdCup = item.cod_corr;
        Pulsomovil.ws_anula({

          Clave: "8TGXJDKCUQRJKUGTAAW0",
          pIdCupo: pIdCup
        }, function (res) {

          var cod = res.WS_AnulaResult.Codigo;

          if (cod == '0') {

            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Hora anulada Exitosamente.')
              .textContent('Gracias por dejar tu cupo disponible a otros pacientes.')
              .ariaLabel('No encontrado')
              .ok('Cerrar.')
              .targetEvent(ev)
            );

            Movil.CancelarHora({
              rut_paciente: rut_paciente,
              cod_corr: pIdCup,
              estado: 3
            }, function (res) {
              console.log('respuesta', JSON.stringify(res))
            });

          } else if (cod == '3') {

            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('No autorizado.')
              .textContent('La agenda seleccionada no está habilitada para anular cupo.')
              .ariaLabel('No encontrado')
              .ok('Lo entiendo!')
              .targetEvent(ev)
            );

          }

        });

        $scope.horasReservadas.splice($scope.horasReservadas.indexOf(item), 1);
      }, function () {
        console.log('cancelaste.');
      });
    }
  });
