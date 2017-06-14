'use strict';

/**
 * @ngdoc function
 * @name hernanhApp.controller:HorasCtrl
 * @description
 * # HorasCtrl
 * Controller of the hernanhApp
 */
angular.module('saltalacaif')


  .controller('HorasCtrl', function ($q, $scope, $rootScope, $state, horasmedicas, tools, $mdDialog, Pulsomovil, $mdSidenav, $timeout, Movil) {

    $scope.goback = function () {
      $state.go('medicos');
    }
    var rut_paciente = window.localStorage.getItem('rut_paciente');
    $scope.imagePath = 'images/icons/icon.png';
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.nohayhoras = false;

    function buildToggler(componentId) {
      return function () {
        $scope.horasReservadas = [];
        $scope.horaspasadas = [];

        Movil.Datospaciente({
          rut_paciente: rut_paciente
        }, function (resp) {
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

            if (res[i].estado !== '1') {
              $scope.nohayhoras = true;
            }

          }
        });
        console.log(componentId);
        $mdSidenav(componentId).toggle();
      };
    }

    function horas() {

      console.log(rut_paciente);
      setTimeout(function () {
        horasmedicas.getMedicos($state.params.Profesional).then(res => {
          for (var key in res) {

            if (res.hasOwnProperty(key)) {
              if (key === $state.params.Profesional) {
                $scope.horas = res[key]
              }

            }
          }
        });
      }, 3000)
    }
    horas()

    $scope.refresh = function () {
      horas();
    }
    $scope.$on($scope.horas, function (change) {
      console.log(change)
    })

    $scope.Horaselect = function (ev, h) {
      var hora = tools.calcularhora(h.Hora)
      if (hora < new Date(Date())) {
        console.log('pasada');
      } else {
      console.log('rut', rut_paciente);
      var rutparce = rut_paciente.split('-')[0]
      console.log('new rut', rutparce);
      console.log(h);
      var confirm = $mdDialog.confirm()
        .title('Confirma tu hora médica con ' + h.Profesional)
        .textContent('Hoy a las ' + h.Hora + ' con el Médico ' + h.Profesional)
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Reservar')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function () {

        Pulsomovil.ws_reserva({

          Clave: "8TGXJDKCUQRJKUGTAAW0",
          pIdCupo: h.Cupo_Corr,
          pRunPaciente: rutparce

        }, function (response) {

          console.log(4453, response);
          var cod = response.WS_ReservaResult.Codigo;

          if (cod == '0') {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Hora agendada con éxito')
              .textContent('Recuerda llegar al menos 15 minutos antes')
              .ariaLabel('No encontrado')
              .ok('Entendido!')
              .targetEvent(ev)
            );
            Movil.InsertarHoraMedica({

              hora_reserva: h.Hora,
              rut_paciente: rut_paciente,
              coordenadas: 'web',
              profesional: h.Profesional,
              rut_profesional: h.Run_Profesional,
              estado: '1',
              cod_corr: h.Cupo_Corr

            }, function (res) {
              console.log(11, res);
              horas();
            });


          } else if (cod == '4') {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Hora agendada!')
              .textContent('Lo sentimos, la hora acaba de ser agendada por otro paciente.')
              .ariaLabel('No encontrado')
              .ok('Lo entiendo!')
              .targetEvent(ev)
            );

          } else if (cod == '5') {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('No puedes tomar dos horas en el día con el mismo Médico.')
              .textContent('Usted ya tiene una hora tomada para el día de hoy. Sí deseas cambiar tu hora, Anula la que ya tienes.')
              .ariaLabel('No encontrado')
              .ok('Lo entiendo!')
              .targetEvent(ev)
            );

          } else if (cod == '6') {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Agenda no habilitada.')
              .textContent('Lo sentimos, la agenda seleccionada no está habilitada para reservar cupo.')
              .ariaLabel('No encontrado')
              .ok('Lo entiendo!')
              .targetEvent(ev)
            );

          } else if (cod == '3') {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Su rut impide tomar horas.')
              .textContent('acércate a regularizar los datos de tu ficha a los modulos de admisión central.')
              .ariaLabel('No encontrado')
              .ok('Lo entiendo!')
              .targetEvent(ev)
            );

          } else {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Agenda no habilitada.')
              .textContent('Lo sentimos, error no controlado.')
              .ariaLabel('No encontrado')
              .ok('Lo entiendo!')
              .targetEvent(ev)
            );
          }
        });
      }, function () {
        console.log('cancelaste.');
      });
        }
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
              .textContent('Problemas con su cuenta, vuelva a inicar sesión.')
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
