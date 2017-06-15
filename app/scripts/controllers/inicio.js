'use strict';

/**
 * @ngdoc function
 * @name hernanhApp.controller:InicioCtrl
 * @description
 * # InicioCtrl
 * Controller of the hernanhApp
 */
angular.module('saltalacaif')

  .controller('InicioCtrl', function($scope, $mdDialog, Movil, datosusuario, $state, $timeout, $rootScope, $crypto) {
    $scope.sesion = function(ev, USER) {
      //

      console.log(`Ingresando con :${(USER.email.indexOf("@") == -1)? 'Rut' : 'Email'}`);
      if (USER.email.indexOf("@") == -1) {
        // si lo que ingreso es distinto a email (RUT), agrego el nuevo login:
        Movil.getHash({
          rut: USER.email
        }, function(res) {
          var hash = res.pass_user

          if (hash == undefined) {

            $scope.invalidmessage = 'Verifique sus datos ingresados.';

          } else {

            var decrypted = $crypto.decrypt(hash).toString();

            if (USER.pass == decrypted) { // comparo credenciales
              var rut = USER.email
              window.localStorage.setItem('rut_paciente', rut);
              $state.go('medicos', {}, {
                reload: true
              });

            } else { // si es distinta, es decir si el hash que trae es antiguo proceso con el login antiguo.
              // 1 uid
              // 2 bad password
              // 3 valido
              Movil.userrut({
                rut: USER.email,
                token: USER.pass
              }, function(resp) {
                if (resp.cod == '2') {

                  // Existen dos posibilidades: que realmente no exista o que  si pero aún no integro el correo
                  $scope.invalidmessage = 'Verifique sus datos ingresados.';
                  //cuando inicie sesion con email cambio el uid por el password hasheado,
                  //la proxima vez que inicie sesion podre hacerlo con rut como con email pasando por la primera condicion
                  //"la validacion de desencriptacion"
                } else {

                  //cambio su contraseña por una hasheada
                  var encrypted = $crypto.encrypt(USER.pass.toString()); //encripto la pass
                  Movil.updatenewpass({ //  y la actualizo en la base de datos cada vez que inicie sesion!
                    rut: USER.email,
                    token: encrypted
                  }, function(res) {

                    rut = USER.email
                    window.localStorage.setItem('rut_paciente', rut);
                    //ionic loading
                    $state.go('medicos', {}, {
                      reload: true
                    });
                  })
                }
              });
            }

          }
        });

      } else {
        $scope.invaliditem = true;
        var mail = USER.email
        firebase.auth().signInWithEmailAndPassword(mail, USER.pass).then(function(firebaseUser) {

          var user = firebase.auth().currentUser;
          if (user != null) { //si el usuario existe, su sesion fue valida por lo cual,
            //esto se ha definido para reparar a las personas que tienen registrado el email pero no la cuenta (personas con undefined)
            Movil.siexiste({
              mail: mail
            }, function(response) {
              if (response.rut == undefined) { //si existe el email que es unico paso al else

                var confirm = $mdDialog.prompt()
                  .title('Estamos Mejorando tu experiencia de usuario!.')
                  .textContent('Estimado usuario, Estámos haciendo cambios importantes para mejorar tu experiencia, necesitamos que te vuelvas a registrar.')
                  .targetEvent(ev)
                  .ok('Seguir')

                $mdDialog.show(confirm).then(function(result) {
                  $scope.registrar()
                }, function() {});
              } else { //por lo cual, inicio sesion perfectamente: y cambio el pass al nuevo
                var encrypted = $crypto.encrypt(USER.pass.toString()); //encripto la pass

                Movil.updatenewpass({ //  y la actualizo en la base de datos cada vez que inicie sesion!
                  rut: response.rut,
                  token: encrypted
                }, function(res) {
                  var rut = response.rut
                  window.localStorage.setItem('rut_paciente', rut);
                  $state.go('medicos');

                })
              }

            });
          }

        }, function(error) {
          //tenemos "auth/invalid-email" - "auth/user-not-found" - "auth/wrong-password" - "auth/too-many-requests"
          $scope.invalid = true;
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

    $scope.registrar = function(ev) {
      var confirm = $mdDialog.prompt()
        .title('Bienvenido a Saltala caif!')
        .textContent('Ingresa tu rut para poder registrarte.')
        .placeholder('Ej. 18338299-1')
        .ariaLabel('ingreso')
        .targetEvent(ev)
        .ok('Seguir')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function(result) {

        if (result == undefined) {
          $scope.status = 'no haz ingresado nada en el campo';
        } else {
          $scope.status = 'Tu rut es: ' + result;
          Movil.posibleusuario({
            rut: result
          }, function(response) {
            var cod = response.cod;
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


              Movil.Datospaciente({
                rut_paciente: response.rut
              }, function(res) {

                if (res.cod == "2") {
                  datosusuario.setData(response);
                  localStorage.setItem('user', JSON.stringify(response))
                  $state.go('registro', {
                    reload: true
                  })
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
      }, function() {
        $scope.status = 'Has cancelado el proceso.';
      });
    };

    $scope.recoverypass = function(ev) {

      var confirm = $mdDialog.prompt()
        .title('¿Se te olvidó tu contraseña?')
        .textContent('Ingresa tu correo para poder recibir un mensaje de restablecimiento.')
        .placeholder('Ej. example@example.com')
        .ariaLabel('ingreso')
        //.initialValue('Buddy')
        .targetEvent(ev)
        .ok('Enviar')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function(result) {
        if (result == undefined) {
          $scope.status = 'no haz ingresado ningun dato.';
        } else {
          var auth = firebase.auth();
          var emailAddress = result;

          auth.sendPasswordResetEmail(emailAddress).then(function() {
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
          }, function(error) {
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
      }, function() {
        $scope.status = 'Has cancelado el proceso.';
      });

    }

  });
