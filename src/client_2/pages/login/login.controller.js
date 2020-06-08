gAuthenticator.controller("LoginController", ["$scope", "$location", "$routeParams",'$cookies', '$timeout', 
function ($scope, $location, $routeParams, $cookies, $timeout) {
  $scope.userFound = false;
              $scope.url = {
    
                  templateUrl: "pages/navBar/navBar.view.html",
                  controller: "homePageCtrl"
              }
              // $scope.user = {};
              
              gapi.load('auth2', function() { // Loads the auth2 component of gapi
                gapi.auth2.init({ // initialize the auth2 using your credentials
                  client_id: '668988752508-s1gu02k5f9jmkg0l5ssvvs63qenljogv.apps.googleusercontent.com'
                }).then(function onInit() { // on complete of init
                  gapi.signin2.render("g-signin2", { // render the HTML button on the screen providing the ID of the element (g-signin2)
                    onsuccess: function(googleUser) { // This executes when a user successfully authorizes you to their data by clicking the button and selecting their account.
                      $scope.userFound = true;
                      $scope.user = {};
                      var profile = googleUser.getBasicProfile();
                      console.log('ID: ' + profile.getId());
                      $scope.user.id = profile.getId();
                      console.log('Name: ' + profile.getName());
                      $scope.user.name = profile.getName();
                      console.log('Image URL: ' + profile.getImageUrl());
                      $scope.user.photo = profile.getImageUrl();
                      console.log('Email: ' + profile.getEmail());
                      $scope.user.email = profile.getEmail();
                      var authResponse = googleUser.getAuthResponse();
                      $scope.user.domain      = googleUser.getHostedDomain();
                      $scope.user.idToken     = authResponse.id_token;
                      $scope.user.expiresAt   = authResponse.expires_at;
                      console.log('Domain: ' + $scope.user.domain);
                      console.log('idToken: ' + $scope.user.idToken);
                      console.log('expiresAt: ' + $scope.user.expiresAt);
                      // Do whatever you need to do to authenticate on your site.
                      $scope.user.sessionGuid = $scope.uuidv4();
                      
                      console.log('GUID: ' + $scope.user.sessionGuid);
                      $cookies.put('id', profile.getId());
                      $cookies.put('name', profile.getName());
                      $cookies.put('photo', profile.getImageUrl());
                      $cookies.put('email', profile.getEmail());
                      $cookies.put('domain', googleUser.getHostedDomain());
                      $cookies.put('idToken', authResponse.id_token);
                      $cookies.put('expiresAt', authResponse.expires_at);
                      $cookies.put('sessionGuid', $scope.uuidv4());
                      $timeout($scope.startApp(), 10000);
                    }
                  });
                });
              });

              $scope.uuidv4 = function(){
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                  return v.toString(16);
                });
              }
    
    $scope.signOut = function() {
        console.log('signOut()');
        auth2.signOut().then(function() {
            signinChanged(false);    
        });
        console.log(auth2);
    };
    
    $scope.disconnect = function() {
        console.log('disconnect()');
        auth2.disconnect().then(function() {
            signinChanged(false);
        });
        console.log(auth2);
    };

    $scope.startApp = function()
    {
      console.log("Leaving Page")
      $location.path('/main');
    }
    
    
    
    }]);
    