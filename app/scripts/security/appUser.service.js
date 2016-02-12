/**
 * Created by jbeckton on 2/10/16.
 */
(function () {
  'use strict';

  angular.module('app.security').service('appUserService', appUserService);

  appUserService.$inject = [];

  /* @ngInject */
  function appUserService() {


    this.username = '';
    this.role = '';
    this.setCurrentUser = setCurrentUser;

    ////////////////

    function setCurrentUser(username, role) {

      this.username = username;
      this.role = role;

    }


  }

})();

