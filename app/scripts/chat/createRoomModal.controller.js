/**
 * Created by jbeckton on 2/11/16.
 */
(function () {
  'use strict';

  angular.module('App').controller('CreateRoomModalCtrl', CreateRoomModalCtrl);

  CreateRoomModalCtrl.$inject = ['$uibModalInstance', 'chatService'];

  /* @ngInject */
  function CreateRoomModalCtrl($uibModalInstance, chatService) {

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.newRoomName = '';
    vm.errorMessage = '';

    activate();

    ////////////////

    function activate() {
      //
    }

    function ok() {

      if(vm.newRoomName){

        chatService.createRoom(vm.newRoomName)
          .then(function(response){
            console.log(response.data.room);
            $uibModalInstance.close(response.data.room);
          },function(response){
            console.log(response);
            vm.errorMessage = response.statusText;
          });

      }
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };

  }

})();

