(function () {
    'use strict';

    angular.module('WebChat').controller('LoginController', LoginController);



    // LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];



    function LoginController($location, AuthenticationService, FlashService, $scope, $window) {
        var auth2;
        // $scope.user = {};
        // $window.appStart = function () {
        //     console.log('appStart()');
        //     gapi.load('auth2', initSigninV2);
        // };

        var initSigninV2 = function () {
            console.log('initSigninV2()');
            auth2 = gapi.auth2.getAuthInstance();
            auth2.isSignedIn.listen(signinChanged);
            auth2.currentUser.listen(userChanged);

            if (auth2.isSignedIn.get() == true) {
                auth2.signIn();
            }
        };

        var signinChanged = function (isSignedIn) {
            console.log('signinChanged() = ' + isSignedIn);
            if (isSignedIn) {
                console.log('the user must be signed in to print this');
                var googleUser = auth2.currentUser.get();
                var authResponse = googleUser.getAuthResponse();
                var profile = googleUser.getBasicProfile();
                $scope.user.id = profile.getId();
                $scope.user.fullName = profile.getName();
                $scope.user.firstName = profile.getGivenName();
                $scope.user.lastName = profile.getFamilyName();
                $scope.user.photo = profile.getImageUrl();
                $scope.user.email = profile.getEmail();
                $scope.user.domain = googleUser.getHostedDomain();
                $scope.user.timestamp = moment().format('x');
                $scope.user.idToken = authResponse.id_token;
                $scope.user.expiresAt = authResponse.expires_at;
                $scope.$digest();
            } else {
                console.log('the user must not be signed in if this is printing');
                $scope.user = {};
                $scope.$digest();
            }
        };

        var userChanged = function (user) {
            console.log('userChanged()');
        };

        $scope.signOut = function () {
            console.log('signOut()');
            auth2.signOut().then(function () {
                signinChanged(false);
            });
            console.log(auth2);
        };

        // function onSignIn(googleUser) {
        //     // get user profile information
        //     console.log(googleUser.getBasicProfile());
        //   }

        $scope.onSignIn = function (googleUser) {
            // get user profile information
            console.log(googleUser.getBasicProfile());
        }


        // var vm = this;

        // vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();

        })();


        // function login() {
        //     vm.dataLoading = true;
        //     AuthenticationService.Login(vm.username, vm.password, function (response) {
        //         if (response.success) {
        //             AuthenticationService.SetCredentials(vm.username, vm.password);
        //             $location.path('/');
        //         } else {
        //             FlashService.Error(response.message);
        //             vm.dataLoading = false;
        //         }
        //     });
        // };
    }

    // LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

})();
