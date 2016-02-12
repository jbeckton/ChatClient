/**
 * Created by jbeckton on 2/9/16.
 */
(function () {
  'use strict';

  angular.module('App').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['loginService', '$state'];

  /* @ngInject */
  function LoginCtrl(loginService, $state) {
    var vm = this;
    vm.doLogin = doLogin;

    activate();

    ////////////////

    function activate() {

    }


    function doLogin(user) {

      console.log('you clicked %s ', user);

      var credentials = {};

      if(user === 'userone') {

        credentials = {username: 'userone', password: 'password'}

      } else if(user === 'usertwo') {

        credentials = {username: 'usertwo', password: 'password'}

      }

      loginService.authenticate(credentials)
        .then(function(response){

        // successful login now redirect to secure area
          $state.go('chat');


      });


    }



  }

})();

