// var gAuthenticator = angular.module('WebChat', ['ngRoute', "ngGravatar", "btford.socket-io", 'ngCookies']).config(function(GravatarProvider){
//   GravatarProvider.setSize(100);
// });
(function () {
  'use strict';

  var gAuthenticator = angular
      .module('gAuthenticatorApp', ['ngRoute', 'ngCookies', "ngGravatar", "btford.socket-io",'leaflet-directive','oi.select','datepicker', 'ui.rCalendar', 'ui.bootstrap', 'angularjs-dropdown-multiselect']);
  gAuthenticator.config(config);
      
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
  function config($routeProvider, $locationProvider, $httpProvider) {
      $routeProvider
          .when('/', {
              controller: 'HomeController',
              templateUrl: 'pages/home/home.view.html',
              controllerAs: 'vm'
          })

          .when('/login', {
              controller: 'LoginController',
              templateUrl: 'pages/login/login.view.html',
              controllerAs: 'logInCtrl'
          })

          .when('/register', {
              controller: 'RegisterController',
              templateUrl: 'pages/register/register.view.html',
              controllerAs: 'vm'
          })

          .otherwise({ redirectTo: '/login' });

          $httpProvider.interceptors.push(function($q) {
            return {
             'request': function(config) {
                 $('#processing').show();
                 return config;
              },
              'response': function(response) {
                 $('#processing').hide();
                 return response;
              }
            };
          });    
  }

  gAuthenticator.run(run);

  run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
  function run($rootScope, $location, $cookies, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookies.getObject('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          var loggedIn = $rootScope.globals.currentUser;
          if (restrictedPage && !loggedIn) {
              $location.path('/login');
          }
      });
  }

})(); 