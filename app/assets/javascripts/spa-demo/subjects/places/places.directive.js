(function(){
  "use strict";
  angular.
  module("spa-demo.subjects")
  .directive('sdPlaces', ['spa-demo.config.APP_CONFIG', function(APP_CONFIG){
    // Runs during compile
    return {
      bindToController: true,
      controller: 'PlaceController',
      controllerAs: 'placesVM',
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: APP_CONFIG.places_query_html,
      replace: true,
      link: function($scope, iElm, iAttrs, controller) {}
    };

  }]);

})();