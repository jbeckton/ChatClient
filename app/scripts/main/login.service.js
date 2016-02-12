/**
 * Created by jbeckton on 2/9/16.
 */
(function () {
  'use strict';

  angular.module('App').factory('loginService', loginService);

  loginService.$inject = ['$http', 'securityService'];

  /* @ngInject */
  function loginService($http, auth) {

    var service = {
      authenticate: authenticate
    };
    return service;

    ////////////////

    // here we simply wrap the security service in case we want to run some additional code to set up some state now that the user is authenticated

    function authenticate(userObj) {

      return auth.login(userObj)
        .then(function(response){

          return response;

        });

    }
  }

})();

