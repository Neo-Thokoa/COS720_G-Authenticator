gAuthenticator.controller("LoginController", ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {
    
              $scope.url = {
    
                  templateUrl: "pages/navBar/navBar.view.html",
                  controller: "homePageCtrl"
              }
    
              $scope.viewAdminFunctions = function()
              {
                $rootScope = null;
                  $location.path('/adminFunctions');
              }
    
              $scope.manageList = function()
              {
                $rootScope = null;
                $location.path('/todoListSettings');
              }
    
    
    
    }]);
    