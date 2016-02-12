/**
 * Created by jbeckton on 2/1/16.
 */
(function () {
  'use strict';

  angular.module('App').controller('ChatCtrl', ChatCtrl);

  ChatCtrl.$inject = ['chatService', '$uibModal', 'socket', 'appUserService'];

  /* @ngInject */
  function ChatCtrl(chatService, $uibModal, socket, appUserService) {
    var vm = this;
    vm.currentRoomName = '';
    vm.rooms = [];
    vm.createRoom = openCreateRoomModal;
    vm.enterRoom = openRoomModal;


    activate();

    ////////////////

    function activate() {

      //console.log('%s in da house!', appUserService.username);


      //socket.emit('user:join', {
      //  user: appUserService.username,
      //  room: 'da house'
      //}, function(result){
      //  console.log('result %o ', result);
      //})

      chatService.getRooms()
        .then(function (response) {
          vm.rooms = response.data;

        });

    }


    function openCreateRoomModal(){

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'scripts/chat/createRoomModal.html',
        controller: 'CreateRoomModalCtrl as modal'
      });

      modalInstance.result.then(function (room) {

      });

    }

    function openRoomModal(roomName) {

      var modalInstance = $uibModal.open({
        animation: true,
        size: 'lg',
        templateUrl: 'scripts/chat/roomModal.html',
        controller: 'RoomModalCtrl as modal',
        resolve: {
          room: function () {
            return {name: roomName};
          }
        }
      });

      modalInstance.closed.then(function (room) {


      });

    }

    socket.on('init', function (data) {
      console.log('socket init %o ', data);
    });



  }

})();

