'use strict';

/**
 * @ngdoc function
 * @name hernanhApp.controller:InicioCtrl
 * @description
 * # InicioCtrl
 * Controller of the hernanhApp
 */
angular.module('saltalacaif')

  .controller('InicioCtrl', function ($scope, $mdDialog, Movil, datosusuario, $state, $timeout,$rootScope) {

    $scope.sesion = function (ev, user) {

      if (user.email.indexOf("@") == -1) {
        Movil.userrut({
          rut: user.email,
          token: user.pass
        }, function (resp) {
          var resq = resp.problem;
          console.log(resq);
          console.log(resp.rut);
          if (resq == undefined) {
            var rut = resp.rut;
            window.localStorage.setItem('rut_paciente', rut);
            $timeout(function () {
              // $ionicLoading.hide();
              $state.go('medicos', {
                reload: true
              })
            }, 2000);
            //fin loading

          } else {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Datos incorrectos')
              .textContent('Verifique nuevamente su rut y contraseña..')
              .ariaLabel('No encontrado')
              .ok('Entendido!')
              .targetEvent(ev)
            );

          }
        })
      } else {

        firebase.auth().signInWithEmailAndPassword(user.email, user.pass).then(function (firebaseUser) {
          var user = firebase.auth().currentUser;
          var uid;
          // var token;
          if (user != null) {
            uid = user.uid;

            Movil.tokenpaciente({
              token: uid
            }, function (response) {
              console.log(response.rut);

              if (response.rut == undefined) {
                console.log('respuesta nula');

                var confirm = $mdDialog.prompt()
                  .title('Estamos Mejorando tu experiencia de usuario!.')
                  .textContent('Estimado usuario, Estámos haciendo cambios importantes para mejorar tu experiencia, necesitamos que te vuelvas a registrar.')
                  .targetEvent(ev)
                  .ok('Seguir')

                $mdDialog.show(confirm).then(function (result) {
                  $scope.registrar()
                }, function () {
                  console.log('nada');
                });


              } else {
                var rut = response.rut
                window.localStorage.setItem('rut_paciente', rut);

                $state.go('medicos', {}, {
                  reload: true
                });


              }
              //fin loading

            });
          }

        }, function (error) {
          //tenemos "auth/invalid-email" - "auth/user-not-found" - "auth/wrong-password" - "auth/too-many-requests"
          $scope.invalid = true;
          console.log(error.code)
          var cod = error.code;
          // $scope.invalidmessage = {};

          if (cod == "auth/invalid-email") {
            $scope.invalidmessage = 'Ingrese un correo con un formato valido.'
          } else if (cod == "auth/user-not-found") {
            $scope.invalidmessage = 'No estas registrado, te invitamos a registrarte.'
          } else if (cod == "auth/wrong-password") {
            $scope.invalidmessage = 'Datos ingresados incorrectamente.'
          } else if (cod == "auth/too-many-requests") {
            $scope.invalidmessage = 'A intentado muchas veces, vuelva a intentarlo mas tarde'
          }


        });
      }
    };

    $scope.registrar = function (ev) {
      var confirm = $mdDialog.prompt()
        .title('Bienvenido a Saltala caif!')
        .textContent('Ingresa tu rut para poder registrarte.')
        .placeholder('Ej. 18338299-1')
        .ariaLabel('ingreso')
        .targetEvent(ev)
        .ok('Seguir')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function (result) {

        if (result == undefined) {
          $scope.status = 'no haz ingresado nada en el campo';
        } else {
          $scope.status = 'Tu rut es: ' + result;
          Movil.posibleusuario({
            rut: result
          }, function (response) {
            var cod = response.cod;
            console.log('response?',response);
            if (cod == "2") {
              $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('No se encuentra en nuestros registros')
                .textContent('Diríjase a recepción de CAIF y solicite su ingreso.')
                .ariaLabel('No encontrado')
                .ok('Entendido!')
                .targetEvent(ev)
              );
            } else {

              console.log('rut de respuesta', response.rut);

              Movil.Datospaciente({
                rut_paciente: response.rut
              }, function (res) {
                console.log('datos del paciente: ', res, 'codigo: ', res.cod);

                if (res.cod == "2") {
                  datosusuario.setData(response);
                  localStorage.setItem('user',JSON.stringify(response))
                  $state.go('registro', {reload: true})
                } else {
                  $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Usted ya se encuentra registrado.')
                    .textContent('Ya eres parte de Saltala Caif. Inicia sesion con tus datos ya registrados.')
                    .ariaLabel('Registrado')
                    .ok('Lo entiendo.')
                    .targetEvent(ev)
                  );
                }
              });
            }

          });
        }
        console.log($scope.status);
      }, function () {
        $scope.status = 'Has cancelado el proceso.';
        console.log($scope.status);
      });
    };

    $scope.recoverypass = function (ev) {

      var confirm = $mdDialog.prompt()
        .title('¿Se te olvidó tu contraseña?')
        .textContent('Ingresa tu correo para poder recibir un mensaje de restablecimiento.')
        .placeholder('Ej. example@example.com')
        .ariaLabel('ingreso')
        //.initialValue('Buddy')
        .targetEvent(ev)
        .ok('Enviar')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function (result) {
        if (result == undefined) {
          $scope.status = 'no haz ingresado ningun dato.';
          console.log($scope.status);
        } else {
          console.log('ejecuto');
          var auth = firebase.auth();
          var emailAddress = result;

          auth.sendPasswordResetEmail(emailAddress).then(function () {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Email enviado!.')
              .textContent('Revisa tu bandeja de entrada!. Se ha enviado un correo a tu bandeja de entrada.')
              .ariaLabel('Registrado')
              .ok('Lo entiendo.')
              .targetEvent(ev)
            );
          }, function (error) {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Correo invalido!.')
              .textContent('El correo ingresado no es valido o no figura en nuestra sistema.')
              .ariaLabel('Registrado')
              .ok('Lo entiendo.')
              .targetEvent(ev)
            );

          });
        }
      }, function () {
        $scope.status = 'Has cancelado el proceso.';
        console.log($scope.status);
      });

    }
  });
