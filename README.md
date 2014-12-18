angular-mixpanel.js
===================

An Angular.js adapter for Mixpanel with a development mode


```javascript
angular.module('app', [])
.config(function($mixpanelProvider) {
  $mixpanelProvider.token = 'rtyrtfhjjk';
})
.controller('AppController', function($scope, $mixpanel, Auth) {

  $scope.login = function(user) {
    Auth.login(user).then(function() {
      $mixpanel.track('LOGIN');
    });
  };

});
```
