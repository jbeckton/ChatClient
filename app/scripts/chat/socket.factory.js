/**
 * Created by jbeckton on 2/11/16.
 */
(function () {
  'use strict';

  angular.module('App').factory('socket', socket);

  socket.$inject = ['$rootScope'];

  /* @ngInject */
  function socket($rootScope) {

    var socket = io.connect('http://localhost:3000/');

    var service = {
      on: on,
      emit: emit
    };
    return service;

    ////////////////

    function on(eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    }

    function emit(eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }

  }

})();

