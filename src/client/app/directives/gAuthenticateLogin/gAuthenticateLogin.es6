(function() {
    'use strict';

    angular.module('WebChat').directive("googleSignInButton", function(){
      return {
        scope: {
            buttonId: '@',
            options: '&'
        },
        template: '<div></div>',
        link: function(scope, element, attrs){
            var div = element.find('div')[0];
            div.id = attrs.buttonId;
            gapi.signin2.render(div.id, scope.options());
        }
      };
    });

})();