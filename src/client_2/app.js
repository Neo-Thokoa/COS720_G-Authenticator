 var gAuthenticator = angular.module('gAuthenticator', ['ngRoute', 'ngCookies']);

 gAuthenticator.config(["$routeProvider", function($routeProvider) {

    $routeProvider
  .when("/", {
       templateUrl: "pages/login/login.view.html",
       controller: "LoginController",
       controllerAs: 'loginCtrl'
   })
   .when("/navbar", {
       templateUrl: "pages/navBar/navBar.view.html",
       controller: "NavBarController",
       controllerAs: 'navCtrl'
   })
   .when("/login", {
       templateUrl: "pages/login/login.view.html",
       controller: "LoginController",
       controllerAs: 'loginCtrl'
   })
   .when("/main", {
       templateUrl: "pages/main/main.view.html",
       controller: "MainController"
   })
   .when("/home", {
        templateUrl: "pages/home/home.view.html",
        controller: "HomeController",
        controllerAs: 'homeCtrl'
    })
    .otherwise({
      redirectTo: "/"
  });
}]);

