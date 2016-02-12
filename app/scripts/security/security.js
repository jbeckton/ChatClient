(function () {
    'use strict';

    angular.module('app.security', [])
        .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {

        $httpProvider.interceptors.push('securityInterceptor');

    }

    angular.module('app.security').constant('securityConfig', {
        baseUrl: '/',
        loginUrl: '/app/login',
        responseTokenName: 'token',
        storedTokenName: 'auth_token',
        authHeader: 'Authorization',
        authToken: 'Bearer',
        storageType: 'localStorage',
        authUrl: '/app/auth'

    });


})();
