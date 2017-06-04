'use strict';

/**
 * @ngdoc function
 * @name hernanhApp.controller:RegistroCtrl
 * @description
 * # RegistroCtrl
 * Controller of the hernanhApp
 */
angular.module('saltalacaif')

  .controller('RegistroCtrl', function ($scope, $rootScope, datosusuario,Movil,$mdDialog,$state) {

    var date = JSON.parse(localStorage.getItem('user'));
    var fullname = date.nombre;
    var apellido1 = fullname.split(' ')[2];
    var apellido2 = fullname.split(' ')[3];
    var nombre1 = fullname.split(' ')[0];
    var nombre2 = fullname.split(' ')[1];

    var nombre = nombre1 + ' ' + nombre2;
    var apellido = apellido1 + ' ' + apellido2;

    var obj = {
      nombre: nombre,
      apellido: apellido,
      rut: date.rut,
      departamento: date.departamento,
      estado: date.estado
    }
    $scope.user = obj

    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var año = fechaActual.getFullYear();
    var hora = fechaActual.getHours();
    var minutes = fechaActual.getMinutes();
    var seconds = fechaActual.getSeconds()
    var ultimo_ingreso = año + '/' + mes + '/' + dia + ' ' + hora + ':' + minutes + ':' + seconds
    var version = '1.9.7'
    $scope.texto = 'Registrate';

    $scope.sesion = function (ev, r) {

      var email = r.email;
      var password = r.pass;
      console.log(email,password);
      if (r.pass == r.verifypass) {

        var user = firebase.auth().currentUser;
        //si existe usuario
        console.log('en firebase',user);
        if (user != null) {
          user.delete().then(function () {
            console.log('eliminado');
            $scope.texto = 'Entrar';
          });
          return user;
        }

        if (email === undefined) {

          Movil.InsertPatient({

            rut: r.rut,
            nombre: r.nombre,
            apellido: r.apellido,
            mail: r.mail,
            pass_user: r.pass,
            departamento: r.departamento,
            fecha_registro: ultimo_ingreso,
            fecha_ultimo_ingreso: ultimo_ingreso,
            coordenadas: 'web',
            version: version

          }, function (response) {

            console.log('response', response);
            $state.go('medicos');
            window.localStorage.setItem('rut_paciente', r.rut);

            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Registro exitoso, ¡Bienvenido Sáltala Caif!')
              .textContent('Ahora Pedir tus horas medicas, es mas facíl que núnca!.')
              .ariaLabel('No encontrado')
              .ok('Recorrer!')
              .targetEvent(ev)
            );

          });
        } else {

          firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {

            var user = firebase.auth().currentUser;
            var uid;

            if (user != null) {
              uid = user.uid;
              Movil.InsertPatient({

                rut: r.rut,
                nombre: r.nombre,
                apellido: r.apellido,
                mail: r.mail,
                pass_user: uid,
                departamento: r.departamento,
                fecha_registro: ultimo_ingreso,
                fecha_ultimo_ingreso: ultimo_ingreso,
                coordenadas: 'web',
                version: version

              }, function (response) {

            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Registro exitoso, ¡Bienvenido Sáltala Caif!')
              .textContent('Ahora Pedir tus horas medicas, es mas facíl que núnca!.')
              .ariaLabel('No encontrado')
              .ok('Recorrer!')
              .targetEvent(ev)
            );
                console.log(response);
                $state.go('medicos');
                window.localStorage.setItem('rut_paciente', r.rut);

              });
            }


          }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        }

      }

    }
  });
