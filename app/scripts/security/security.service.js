(function () {
  'use strict';

  angular.module('app.security').factory('securityService', securityService);

  securityService.$inject = ['$log', '$q', 'securityConfig', 'storage', '$injector', 'appUserService'];

  function securityService($log, $q, config, storage, $injector, appUserService) {


    var service = {
      getToken: getToken,
      setToken: setToken,
      removeToken: removeToken,
      logout: logout,
      setStorageType: setStorageType,
      isAuthenticated: isAuthenticated,
      login: login
    };

    return service;


    function getToken() {
      return storage.get(tokenName);
    }

    function setToken(response) {
      if (!response) {
        return $log.warn('Security Service Warning: Can\'t set token without passing a value');
      }


      var token;

      if (response && response.data) {

        token = response.data[config.responseTokenName];

      }

      if (!token) {
        return $log.warn('Security Service Warning: Expecting a token named "' + config.responseTokenName);
      }

      storage.set(config.storedTokenName, token);


    }

    function removeToken() {
      storage.remove(tokenName);

    }

    function isAuthenticated() {

      var $http = $injector.get('$http'); // needed this to fix circular reference error
      var token = storage.get(config.storedTokenName);
      var deferred = $q.defer();

      if (token) {

        var options = {};
        options.url = joinUrl(config.baseUrl, config.authUrl);
        options.method = 'GET';

        $http(options).then(function (response) {
          //console.log('isAuthenticated response success %o', response);

          appUserService.setCurrentUser(response.data.user, '');

          deferred.resolve({status: response.status, statusText: response.statusText});

        }, function (reason) {
          //console.log('isAuthenticated response fail %o', reason);
          deferred.reject({status: reason.status, statusText: reason.statusText});
        });

        return deferred.promise;

      }

      deferred.reject({status: 401, statusText: 'Unauthorized'});
      return deferred.promise;

    }

    function logout() {

      return $q.when(storage.remove(tokenName));
    }

    function login(user, options) {

      var $http = $injector.get('$http'); // needed this to fix circular reference error
      options = options || {};
      options.url = options.url ? options.url : joinUrl(config.baseUrl, config.loginUrl);
      options.data = user || options.data;
      options.method = options.method || 'POST';

      return $http(options).then(function (response) {
        setToken(response);

        appUserService.setCurrentUser(response.data.user, '');

        return response;
      });

    }

    function setStorageType(type) {

      config.storageType = type;
    }


    function joinUrl(baseUrl, url) {
      if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
      }

      var joined = [baseUrl, url].join('/');

      var normalize = function (str) {
        return str
          .replace(/[\/]+/g, '/')
          .replace(/\/\?/g, '?')
          .replace(/\/\#/g, '#')
          .replace(/\:\//g, '://');
      };

      return normalize(joined);
    };


  }
})();
