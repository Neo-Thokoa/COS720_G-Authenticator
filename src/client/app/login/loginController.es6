const INIT = new WeakMap();
// const SERVICE = new WeakMap();
const COOKIES = new WeakMap();

class LoginController {

      constructor(Users, $scope, $location, $http, $cookies) {
            this.Users = Users;
            this.username = '';
            this.$location = $location;
            this.$http = $http;
            COOKIES.set(this, $cookies);
            $scope.options =  {
                  'onsuccess': function(response) {
                    console.log(response);
                    
                    COOKIES.set("access_token", response[2]);
                    console.log("Ayeye");
                    alert(response.get("wc"))
                  }
            }
      
                
      }

      onSuccess(googleUser) 
      {
            console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      }
          
      onFailure(error) 
      {
            console.log(error);
      }
      
      renderButton() {
            gapi.signin2.render('my-signin2', {
              'scope': 'profile email',
              'width': 240,
              'height': 50,
              'longtitle': true,
              'theme': 'dark',
              'onsuccess': onSuccess,
              'onfailure': onFailure
            });
      }

      onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());

            var id_token = googleUser.getAuthResponse().id_token;
            console.log("ID Token: " + id_token);
           }


      // Checks with the server that the username is available, if it is, login the user
      attemptToLogin(username) {
            const self = this;
            this.$http({method: 'get', url: '/users/available?username=' + username}).then(function successCallback(response) {
                  if(response.data.isAvailable) {
                        self.login(username);
                  } else {
                        // Display error message
                        self.info = 'username is not available. Try something else';
                  }
            });
      }

      // Performs login operation and reroutes view
      login(username) {
            // Login user
            this.Users.setUser(username);
            // Show Chat view
            this.$location.path('/chat');
      }

      // Called when form is submitted
      processLogin(shouldGenerateUsername) {
            // Check if should generate a random username
            if(shouldGenerateUsername) {
                  this.attemptToLogin(this.Users.randomID());
            } else {
                  console.log('Ayeye: ');
                  this.callgoogle();
                  const username = this.username;
                  this.attemptToLogin(username);
            }
      }
      

}

angular.module('WebChat').controller( 'LoginController', LoginController);
LoginController.$inject = ['Users', '$scope', '$location', '$http', '$cookies'];
