'use strict';


angular.module('saltalacaif')

.service('Movil', function($resource, $httpParamSerializerJQLike) {

  var movil = $resource('http://alafila.cl/Chincol/ChincolCtrl/:action', null,
    {


'InsertPatient': { method:'POST',
                   params: { action : 'InsertPaciente' },
                   headers : {"Content-Type": "application/x-www-form-urlencoded"},
                   transformRequest: function(data) {
                   return $httpParamSerializerJQLike(data);
              }},
'UpdatePatient': { method:'POST',
                   params: { action : 'ActualizarPaciente' },
                   headers : {"Content-Type": "application/x-www-form-urlencoded"},
                   transformRequest: function(data) {
                   return $httpParamSerializerJQLike(data);
              }},

'Datospaciente': { method:'POST',

                   params: { action : 'DatosPaciente' },
                   headers : {"Content-Type": "application/x-www-form-urlencoded"},
                   transformRequest: function(data) {
                   return $httpParamSerializerJQLike(data);
              }},
  'tokenpaciente': { method:'POST',
                  params: { action : 'Token' },
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
              }},
  'LastConection': { method:'POST',
                  params: { action : 'Ultimaconexion' },
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
              }},
 'InsertarHoraMedica': { method:'POST',

                   params: { action : 'InsertarHoraMedica' },
                   headers : {"Content-Type": "application/x-www-form-urlencoded"},
                   transformRequest: function(data) {
                   return $httpParamSerializerJQLike(data);
              }},
  'VerHorasMedicas': { method:'POST',
                  params: { action : 'VerHorasMedicas' },
                  isArray:true,
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
              }},
  'CancelarHora': { method:'POST',
                  params: { action : 'CancelarHora' },
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
              }},
  'posibleusuario': { method:'POST',
                  params: { action : 'PosiblesUsuarios' },
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
              }} ,
  'userrut': { method:'POST',
                  params: { action : 'enterut' },
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
              }},
  'cronjob': { method:'POST',
                  params: { action : 'getcronjob' },
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
              }} ,
  'getversion': { method:'POST',
                  params: { action : 'CurrentVersion' },
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
              }}  ,
  'UpdateVersion': { method:'POST',
                  params: { action : 'Myversion' },
                  headers : {"Content-Type": "application/x-www-form-urlencoded"},
                  transformRequest: function(data) {
                  return $httpParamSerializerJQLike(data);
                }}  ,
    'getHash': { method:'POST',
                    params: { action : 'getHash' },
                    headers : {"Content-Type": "application/x-www-form-urlencoded"},
                    transformRequest: function(data) {
                    return $httpParamSerializerJQLike(data);
                }}  ,
    'siexiste': { method:'POST',
                    params: { action : 'siexiste' },
                    headers : {"Content-Type": "application/x-www-form-urlencoded"},
                    transformRequest: function(data) {
                    return $httpParamSerializerJQLike(data);
                }}  ,
   'updatenewpass': { method:'POST',
                   params: { action : 'updatenewpass' },
                   headers : {"Content-Type": "application/x-www-form-urlencoded"},
                   transformRequest: function(data) {
                   return $httpParamSerializerJQLike(data);
               }}  ,
  'fechactual': { method:'POST',
                 params: { action : 'quehoraes' },
                 headers : {"Content-Type": "application/x-www-form-urlencoded"},
                 transformRequest: function(data) {
                 return $httpParamSerializerJQLike(data);
             }}  ,
    });

  return movil;
})


  .factory('tools', function () {

      return {
        calcularhora: function horario(hora) {
          var myhora = new Date(Date())
          myhora.setHours(Number(hora.split(":")[0]), Number(hora.split(":")[1]), 0, 0)
          return myhora;
        }
      }
    })


 .factory('datosusuario', function ($q) {

      var datouser = {};

      return {
        getData: function () {
          var fullname = datouser.nombre;
          var apellido1 = fullname.split(' ')[0];
          var apellido2 = fullname.split(' ')[1];
          var nombre1 = fullname.split(' ')[2];
          var nombre2 = fullname.split(' ')[3];

          var nombre = nombre1 + ' ' + nombre2;
          var apellido = apellido1 + ' ' + apellido2;

          var obj = {
            nombre: nombre,
            apellido: apellido,
            rut: datouser.rut,
            departamento: datouser.departamento,
            estado: datouser.estado
          }
          localStorage.setItem('user',datouser)
          return $q.when(obj);
        },
        setData: function (params) {
          datouser = params
          return true;
        }
      }
    })

    .service('horasmedicas', horasmedicas)

    .service('Pulsomovil', function ($resource, $httpParamSerializerJQLike) {
      var service = $resource('http://nodeproyects-dev.us-west-2.elasticbeanstalk.com/webservices/:action', null,
        //    var service = $resource('http://localhost:8081/webservices/:action', null,
        {
          'ws_admision': {
            method: 'POST',
            params: {

              action: 'Consultacupo'
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            transformRequest: function (data) {
              return $httpParamSerializerJQLike(data);
            }
          },
          'ws_reserva': {
            method: 'POST',
            params: {
              action: 'Reservacupo'
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            transformRequest: function (data) {
              return $httpParamSerializerJQLike(data);
            }
          },

          'ws_anula': {
            method: 'POST',
            params: {
              action: 'Anulacupo'
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            transformRequest: function (data) {
              return $httpParamSerializerJQLike(data);
            }
          },
        });


      return service;
    })

    .factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
      return $firebaseAuth();
    }])

    .directive("passwordVerify", function () {
      return {
        require: "ngModel",
        scope: {
          passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
          scope.$watch(function () {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
              combined = scope.passwordVerify + '_' + ctrl.$viewValue;
            }
            return combined;
          }, function (value) {
            if (value) {
              ctrl.$parsers.unshift(function (viewValue) {
                var origin = scope.passwordVerify;
                if (origin !== viewValue) {
                  ctrl.$setValidity("passwordVerify", false);
                  return undefined;
                } else {
                  ctrl.$setValidity("passwordVerify", true);
                  return viewValue;
                }
              });
            }
          });
        }
      };
    })



      function horasmedicas($q, Pulsomovil,Movil) {

        Movil.fechactual({},function(res){
        var fecha = localStorage.setItem('hora',res.fecha);
        })
        var fechasend = localStorage.getItem('hora');
        console.log(3434,fechasend);
        var self = this
        self.medicos = []
        self.horamedica = []
        const getMedicos = () => {

          return Pulsomovil.ws_admision({

            Clave: "8TGXJDKCUQRJKUGTAAW0",
            pAgenda: 170,
            pFecha: fechasend,
            pTipoProfesional: 1

          }, function (res) {
            self.medicos = _.groupBy(res.WS_ConsultaCuposResult.Cupos.Detalle_Agenda.Detalle_Agenda, 'Profesional')
            return self.medicos
          });

        }
        self.getMedicos = () => {

          return $q.when(self.medicos)
        }

        getMedicos();

        return self

      }
