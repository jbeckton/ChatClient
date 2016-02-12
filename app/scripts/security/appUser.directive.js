/**
 * Created by jbeckton on 2/10/16.
 */
(function () {
  'use strict';

  angular.module('app.security').directive('appUser', appUser);

  appUser.$inject = [];

  /* @ngInject */
  function appUser() {
    var directive = {
      bindToController: true,
      controller: AppUserCtrl,
      controllerAs: 'currentUser',
      restrict: 'EA',
      templateUrl: '/scripts/security/appUser.template.html'
    };
    return directive;

  }

  AppUserCtrl.$inject = ['appUserService'];

  /* @ngInject */
  function AppUserCtrl(appUserService) {

    var vm = this;
    vm.info = getInfo;

    function getInfo(){

      var result = '';

      if(appUserService.username){

        result = 'Chatting as ' + appUserService.username;

      }

      return result;

    }


  }

})();

