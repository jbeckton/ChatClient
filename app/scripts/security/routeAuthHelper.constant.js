(function () {
    'use strict';

    angular.module('app.security').constant('routeAuthHelper', {


        authorize: function ($q, $location, securityService) {

            var deferred = $q.defer();

            securityService.isAuthenticated()
                .then(function (response) {

                    deferred.resolve(response);

                }, function (reason) {

                    var routeResolveResult = {type: 'securityexception', data: reason}

                    deferred.reject(routeResolveResult);

                })

            return deferred.promise;

        }

    });


})();
