(function(){
  "use strict";
  angular.module('spa-demo.subjects')
  .factory('PlaceFactory', ["$resource", "spa-demo.config.APP_CONFIG", function($resource, APP_CONFIG){
    var service = $resource(APP_CONFIG.server_url + "/api/places/:id",
      { id: '@id' },
      {
        update: {method: "PUT"}
      });
    return service;
  }]);

})();