describe('HomeController', function() {

      var $controller;
      var homeController;
      var $scope;
      var $location;
      // Before each test load our web chat module
      beforeEach(angular.mock.module('gAuthenticator'));

      // Before each test set our injected Messages factory (_Messages_) to our local Messages variable
       beforeEach(inject(function(_$controller_, _$location_) {
         $controller = _$controller_;
         $scope = {};
         $location = _$location_;
         homeController = $controller('HomeController', { $scope: $scope });
       }));

       // A simple test to verify the Login Controller exists
       it('should exist', function() {
             expect($controller).toBeDefined();
      });

      // it('should set user and change location to chat route', function() {
      //       loginController.username = 'my_user';
      //       spyOn(Users, 'setUser');
      //       loginController.login( 'my_user');

      //       // Check that it sets a new user
      //       expect(Users.setUser).toHaveBeenCalledWith('my_user');
      //       // Check location route
      //       expect($location.path()).toBe('/chat');

      // });


});
