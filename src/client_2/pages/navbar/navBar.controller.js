gAuthenticator.controller("NavBarController", ["$scope", "$location","$cookies", function ($scope, $location, $cookies){

        $scope.cleaner = function () {
            $rootScope = null;
        }
        
        $scope.signout = function () {
            $rootScope = null;
            $location.path('/login');
        };

        $scope.viewFindings = function () {
            $rootScope = null;
            $location.path('/adminMenu');
        };

        $scope.home = function () {
            $rootScope = null;
            $location.path('/home');
        }

        $scope.email = $cookies.get('email');
        console.log($scope.email);


}]);
