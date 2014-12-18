angular.module('ngMixpanel', [
])
.provider('$mixpanel', function() {

  this.initOnBootstrap = true;
  this.development = false;
  this.debug = false;
  this.token = null;

  this.init = function(token) {
    var args = Array.prototype.slice.call(arguments, 0);
    if (!token) {
      throw new Error('token');
    }

    if (window.mixpanel) {
      if (this.development) {
        window.mixpanel.init(this.token, {debug: this.debug});
      } else {
        window.mixpanel.init.apply(window, args);
      }
    }
  };

  if (this.initOnBootstrap) {
    this.init(this.token);
  }

  this.$get = ['$window', '$mixpanelMock', function($window, $mixpanelMock) {
    return ($window.mixpanel || this.development) ? $window.mixpanel : $mixpanelMock;
  }]; // end $get

})
.provider('$mixpanelMock', function() {

  var noopPartial = function(type, logger) {
    return function(){
      logger('Mixpanel:', type, arguments);
    };
  };

  this.$get = ['$log', function($log) {
    var logger = $log.log;

    return {
      'init': noopPartial('init', logger),
      'push': noopPartial('push', logger),
      'disable': noopPartial('disable', logger),
      'track': noopPartial('track', logger),
      'track_links': noopPartial('track_links', logger),
      'track_forms': noopPartial('track_forms', logger),
      'register': noopPartial('register', logger),
      'register_once': noopPartial('register_once', logger),
      'unregister': noopPartial('unregister', logger),
      'identify': noopPartial('identify', logger),
      'get_distinct_id': noopPartial('get_distinct_id', logger),
      'alias': noopPartial('alias', logger),
      'set_config': noopPartial('set_config', logger),
      'get_config': noopPartial('get_config', logger),
      'get_property': noopPartial('get_property', logger),
      'people': {
        'set': noopPartial('people.set', logger),
        'set_once': noopPartial('people.set_once', logger),
        'increment': noopPartial('increment', logger),
        'append': noopPartial('append', logger),
        'track_charge': noopPartial('track_charge', logger),
        'clear_charges': noopPartial('clear_charges', logger),
        'delete_user': noopPartial('delete_user', logger)
      },
      'library_name': {
        'track': noopPartial('library_name.track', logger)
      },
      'cookie': {
        'clear': noopPartial('cookie.clear', logger)
      }
    }; // end mock
  }]; // end $get
}); // end module
