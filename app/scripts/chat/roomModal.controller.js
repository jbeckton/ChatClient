/**
 * Created by jbeckton on 2/11/16.
 */
(function () {
  'use strict';

  angular.module('App').controller('RoomModalCtrl', RoomModalCtrl);

  RoomModalCtrl.$inject = ['socket','$uibModalInstance', 'room', 'appUserService'];

  /* @ngInject */
  function RoomModalCtrl(socket, $uibModalInstance, room, appUserService) {
    var vm = this;
    vm.title = room.name;
    vm.messageTxt = '';
    vm.currentRoomName = room.name;
    vm.roomUserNames = [];
    vm.userName = appUserService.username;
    vm.messages = [];
    vm.leave = leaveRoom;
    vm.send = sendMessage;

    activate();

    ////////////////

    function activate() {

      socket.emit('user:join', {
        user: vm.userName,
        room: vm.currentRoomName
      }, function(result){
        console.log('result %o ', result);
      });

      userJoin({user: vm.userName, room: vm.currentRoomName});

    }

    function leaveRoom() {

      socket.emit('user:leave', {
        user: vm.userName,
        room: vm.currentRoomName
      }, function(result){
        console.log('result %o ', result);
      });

      $uibModalInstance.dismiss('leave');

    }

    function sendMessage() {

      if(vm.messageTxt){

        socket.emit('send:message', {
          user: vm.userName,
          message: vm.messageTxt,
          room: vm.currentRoomName
        });

        vm.messages.push({
          user: vm.userName,
          text: vm.messageTxt
        });

        vm.messageTxt = '';

      }


    }

    function userJoin(data) {

      vm.messages.push({
        user: vm.currentRoomName,
        text: data.user + ' has joined'
      });

      vm.roomUserNames.push(data.user);
    }

    function userLeave(data) {

      vm.messages.push({
        user: vm.currentRoomName,
        text: data.user + ' has left'
      });


      var index = vm.roomUserNames.indexOf(data.user);
      if (index > -1) {
        vm.roomUserNames.splice(index, 1);
      }

    }

    socket.on('send:message', function(data) {

      if(data.room === vm.currentRoomName){

        vm.messages.push({
          user: data.user,
          text: data.message
        });

      }

    });

    socket.on('user:join', function(data) {

      if(data.room === vm.currentRoomName) {
        userJoin(data);
      }

    });

    socket.on('user:leave', function(data) {

      if(data.room === vm.currentRoomName) {
        userLeave(data)
      }

    });

  }

})();

