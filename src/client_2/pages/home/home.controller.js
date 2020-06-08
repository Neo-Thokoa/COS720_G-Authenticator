gAuthenticator.controller("HomeController", ["$scope", "$location", function ($scope, $location) {

      $scope.cleaner = function()
        {
            $rootScope = null;
        }

        $scope.homepage = "Active";


      $scope.openPage = function(url)
      {
        window.location = url;
      };

        $scope.url = {

        templateUrl: "pages/navBar/navBar.view.html",
        controller: "NavBarController"
        }

        $scope.viewTodoMenu = function()
        {
          $rootScope = null;
        	$location.path('/todoListMenu');
        }

        $scope.startApp = function()
        {
        	$location.path('main');
        }

}]);
