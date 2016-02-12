(function () {
    'use strict';

    angular.module('app.security').factory('storage', storage);

    storage.$inject = ['$window', '$log', 'securityConfig'];

    function storage($window, $log, config) {

        var store = {};
        

        var service = {
            get: get,
            set: set,
            remove: remove
        };

        return service;

        function get(key) {
            return isStorageAvailable ? $window[config.storageType].getItem(key) : store[key];
        }

        function set(key, value) {


            return isStorageAvailable ? $window[config.storageType].setItem(key, value) : store[key] = value;
        }

        function remove(key) {
            return isStorageAvailable ? $window[config.storageType].removeItem(key) : delete store[key];
        }

        function isStorageAvailable() {

            try {
                var supported = config.storageType in $window && $window[config.storageType] !== null;

                if (supported) {
                    var key = Math.random().toString(36).substring(7);
                    $window[config.storageType].setItem(key, '');
                    $window[config.storageType].removeItem(key);
                }

                return supported;
            } catch (e) {
                return false;
            }

        }

        if (!isStorageAvailable) {
            $log.warn('Storage Service Warning: ' + config.storageType + ' is not available.');
        }
    }
})();