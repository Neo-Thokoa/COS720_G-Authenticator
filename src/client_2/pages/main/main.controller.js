gAuthenticator.controller("MainController", ['$http',"$scope", "$location", '$cookies', function ($http, $scope, $location, $cookies) {

  $scope.loader = false;
  $scope.result = "-";
  $scope.naiveAccuracy = "-";
  $scope.dtAccuracy = "-";
  $scope.mostAccurate = "-";
  $scope.classifierUsed = "-";
  $scope.ngram = {
        value: 10
      };

      $scope.cleaner = function()
        {
            $rootScope = null;
        }


      $scope.openPage = function(url)
      {
        window.location = url;
      };

      $scope.email = $cookies.get('email');
      console.log($scope.email);
      $scope.id = $cookies.get('id');
      $scope.name = $cookies.get('name');
      $scope.photo = $cookies.get('photo');
      $scope.domain = $cookies.get('domain');
      $scope.idToken = $cookies.get('idToken');
      $scope.expiresAt = $cookies.get('expiresAt');
      $scope.sessionGuid = $cookies.get('sessionGuid');


        $scope.url = {

        templateUrl: "pages/navBar/navBar.view.html",
        controller: "NavBarController"
        }


        $scope.initializeApp = function()
        {
          var data = {'id': $scope.id}
          $scope.loader = true;
          $http.get('/dataAcquisition', JSON.stringify(data))
          .then(function successCallback(resp){
            $scope.loader = false;
            console.log("Successful callback")
              console.log(resp.data);
              if(resp.data.status == "Success")
              {
                console.log("Execution going to dataClean")
                $scope.dataClean();
              }
          },function(error){
              console.log("Error occured")
              console.log(error);
          });
        };

        $scope.dataClean = function()
        {
          console.log("Inside Data Clean")
          $scope.loader = true;
          $http({
            method:'GET',
            url:'/dataCleaning/'
          })
          .then(function(resp){
            $scope.loader = false;
              console.log(resp.data);
              $scope.dataExtract();
              // $scope.dataAnalysis();

          },function(error){
              console.log(error);
          });
        };

        $scope.dataExtract = function()
        {
          console.log("Inside Feature Engineering");
          $scope.loader = true;
          $http({
            method:'GET',
            url:'/featureEngineer/'
          })
          .then(function(resp){
            $scope.loader = false;
            console.log(resp.data);
            $scope.dataAnalysis();
          },function(error){
            console.log("Something failed Feature Engineering");
              console.log(error);
          });
        };


        $scope.dataAnalysis = function()
        {
          console.log("Inside Data Analysis")
          $scope.loader = true;
          $http({
            method:'GET',
            url:'/featureAnalysis/'
          })
          .then(function(resp){
            $scope.loader = false;
            console.log(resp);
              $scope.naiveAccuracy = resp.data.naiveaccuracy;
              $scope.dtAccuracy = resp.data.dtaccuracy;
              $scope.classifierUsed = resp.data.mostAccurate;

              $scope.result = resp;
              console.log($scope.result);
          },function(error){
            console.log("Something failed Data Analysis");
              console.log(error);
          });
        };

        $scope.unreadAnalysis = function()
        {
          console.log("Inside Unread Analysis")
          $scope.loader = true;
          $http({
            method:'GET',
            url:'/unreadAnalysis/',
          })
          .then(function(resp){
            $scope.loader = false;
              $scope.result = resp.data;
              console.log($scope.result);
              $scope.activate();
          },function(error){
              console.log(error);
          });

        }


        $scope.activate = function()
        {
          console.log("Heita");
          if($scope.result.authorastatus != "DNE")
          {
            if($scope.result.claimedA != $scope.result.detectedAuthorA)
            {
              $scope.sendMessage($scope.result.claimedA, $scope.result.detectedAuthorA);
            }
          }
          if($scope.result.authorbstatus != "DNE")
          {
            if($scope.result.claimedB != $scope.result.detectedAuthorB)
            {
              $scope.sendMessage($scope.result.claimedB, $scope.result.detectedAuthorB);
            }
          }
        }

        $scope.sendMessage = function(claimer, detecter)
        {
          $scope.message = "Please Note \n We Have Detected that the email claimed to by written by " + claimer + " was detected to be " + detecter;
          console.log("Inside Warning Message", $scope.message);
          // $scope.loader = true;
          $http({
            method:'GET',
            url:'/sendmail',
            crossDomain: true,
            data:{'message': $scope.message}
          })
          .then(function(resp){
            console.log("We made it");
            $scope.loader = false;
              $scope.result = resp.data;
              console.log($scope.result);
          },function(error){
              console.log(error);
          });
          // $http.get("http://127.0.0.1:5000/dataAcquisition/").then(function(response){
          //   console.log(response.data); });
        }

        $scope.initializeApp();


}]);
