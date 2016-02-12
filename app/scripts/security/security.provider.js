(function () {
    'use strict';

    angular.module('app.security').provider('$security', securityProvider);

    securityProvider.$inject = ['securityConfig'];

    function securityProvider(config) {

        Object.defineProperties(this, {
            baseUrl: {
                get: function () { return config.baseUrl; },
                set: function (value) { config.baseUrl = value; }
            },
            loginUrl: {
                get: function () { return config.loginUrl; },
                set: function (value) { config.loginUrl = value; }
            },
            responseTokenName: {
                get: function () { return config.responseTokenName; },
                set: function (value) { config.responseTokenName = value; }
            },
            storedTokenName: {
                get: function () { return config.storedTokenName; },
                set: function (value) { config.storedTokenName = value; }
            },
            authHeader: {
                get: function () { return config.authHeader; },
                set: function (value) { config.authHeader = value; }
            },
            authToken: {
                get: function () { return config.authToken; },
                set: function (value) { config.authToken = value; }
            },
            storageType: {
                get: function () { return config.storageType; },
                set: function (value) { config.storageType = value; }
            },
            authUrl: {
                get: function () { return config.authUrl; },
                set: function (value) { config.authUrl = value; }
            }


        });

        
        this.$get = securityProviderFactory;

        securityProviderFactory.$inject = ['securityConfig','securityService'];
        
        function securityProviderFactory(securityConfig, securityService) {
            
            var $security = {
                isAuthenticated: isAuthenticated
            };

            return $security;
            
            function isAuthenticated() {

                return securityService.isAuthenticated();

            }


        }
    }
})();