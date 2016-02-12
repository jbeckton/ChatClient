(function () {
    'use strict';

    angular.module('app.security').factory('securityInterceptor', interceptor);

    interceptor.$inject = ['$q', 'securityConfig', 'storage','securityService'];

    /* @ngInject */
    function interceptor($q, config, storage, securityService) {

        var service = {
            request: request,
            responseError: responseError
        };
        return service;


        function request(request) {

            var tokenName = config.storedTokenName;
            var storedToken = storage.get(tokenName);

            if (config.authToken && storedToken) {
                var authToken = config.authToken + ' ' + storedToken;

                request.headers[config.authHeader] = authToken;
            }


            return request;


        }

        function responseError(response) {
            return $q.reject(response);
        }
    }

})();

