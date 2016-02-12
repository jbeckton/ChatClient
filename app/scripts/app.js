(function(){
  'use strict';

angular.module('App', ['ngAnimate', 'ngCookies', 'ngResource', 'ui.router', 'ngSanitize', 'ngTouch', 'app.security', 'oc.lazyLoad', 'ui.bootstrap'])
  .config(config)
  .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', 'routeAuthHelper', '$ocLazyLoadProvider', '$securityProvider'];

  function config($stateProvider, $urlRouterProvider, routeAuthHelper, $ocLazyLoad, $security) {

    $urlRouterProvider.when('', '/').otherwise('/notfound');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'scripts/main/main.html',
        controller: 'MainCtrl as main',
        resolve: {
          dependencies: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'MainController',
                files: ['scripts/main/main.controller.js']
              }
            );
          }
        }
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'scripts/chat/chat.html',
        controller: 'ChatCtrl as chat',
        resolve: {
          authorize: routeAuthHelper.authorize,
          dependencies: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'ChatController',
                files: ['scripts/chat/chat.controller.js', 'scripts/chat/chat.service.js', 'scripts/chat/createRoomModal.controller.js', 'scripts/chat/socket.factory.js', 'scripts/chat/roomModal.controller.js']
              }
            );
          }
        }
      })
      //.state('room', {
      //  url: '/chat/room/:Id',
      //  templateUrl: 'scripts/chat/room.html',
      //  controller: 'AboutCtrl as about',
      //  resolve: {
      //    authorize: routeAuthHelper.authorize,
      //    dependencies: function ($ocLazyLoad) {
      //      return $ocLazyLoad.load(
      //        {
      //          name: 'RoomController',
      //          files: ['scripts/chat/room.controller.js']
      //        }
      //      );
      //    }
      //  }
      //})
      .state('login', {
        url: '/login',
        templateUrl: 'scripts/main/login.html',
        controller: 'LoginCtrl as login',
        resolve: {
          dependencies: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'LoginController',
                files: ['scripts/main/login.controller.js','scripts/main/login.service.js']
              }
            );
          }
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'scripts/main/forbidden.html',
        controller: function(){}
      })
      .state('notFound', {
        url: '/notfound',
        templateUrl: 'scripts/main/404.html',
        controller: function(){}
      });


    // configure security
    $security.responseTokenName = 'authToken'; // this is the name of the token coming to us in the response upon successful login
    $security.storedTokenName = 'viawestAuth_Token'; //  this is the name of the token that is stored in browser local storage
    $security.baseUrl = 'http://localhost:3000';
    $security.loginUrl = '/login'; // this url is where we post the users credentials to for login
    $security.authUrl = '/auth'; // this url will take our stored token and validate it also letting the app know if the user is still logged in


  };

  run.$inject = ['$rootScope', '$state', '$stateParams', '$location'];

  function run($rootScope, $state, $stateParams, $location){

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){

      event.preventDefault();

      //console.log('$stateChangeError error %o ', error);

      // handle route change errors

      if(error){

        if(error.type){

          // Handle route change security errors

          if(error.type == 'securityexception'){

            // 401 (Unauthorized) - means I do not know who your are, go login or authenticate again
            if(error.data.status == 401){

              console.log('redirect to login');
              $location.path('/login');
            }

            // 403 (Forbidden) - means you are logged in but you do not have authorization to perform the request
            if(error.data.status == 403){

              console.log('redirect to forbidden');
              $location.path('/forbidden');
            }
          }

        }


      }

    })


  };


})();

