 var gAuthenticator = angular.module('gAuthenticator', ['ngRoute']);

 gAuthenticator.config(["$routeProvider", function($routeProvider) {

    $routeProvider
  .when("/", {
       templateUrl: "pages/home/home.view.html",
       controller: "HomeController",
       controllerAs: 'homeCtrl'
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
    .otherwise({
      redirectTo: "/"
  });
}]);
