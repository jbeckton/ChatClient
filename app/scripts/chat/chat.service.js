/**
 * Created by jbeckton on 2/10/16.
 */

(function () {
  'use strict';

  angular.module('App').factory('chatService', chatService);

  chatService.$inject = ['$http','$rootScope'];

  /* @ngInject */
  function chatService($http, $rootScope) {


    var service = {
      getRooms: getRooms,
      createRoom: createRoom
    };

    return service;



    ////////////////

    function createRoom(name) {

      return $http({url:'http://localhost:3000/createroom', method: 'Post', data: {name: name}})
        .then(function(response){
          return response;
        });

    }

    function getRooms() {


      return $http({url:'http://localhost:3000/rooms', method: 'GET'})
        .then(function(response){
          return response

        });


    }


  }

})();

