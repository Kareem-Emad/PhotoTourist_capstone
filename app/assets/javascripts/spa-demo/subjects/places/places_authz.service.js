(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.PlacesAuthz", PlacesAuthzFactory);

  PlacesAuthzFactory.$inject = ["spa-demo.authz.Authz",
                                "spa-demo.authz.BasePolicy"];
  function PlacesAuthzFactory(Authz, BasePolicy) {
    function PlacesAuthz() {
      BasePolicy.call(this, "Place");
    }

      //start with base class prototype definitions
    PlacesAuthz.prototype = Object.create(BasePolicy.prototype);
    PlacesAuthz.constructor = PlacesAuthz;

      //override and add additional methods
    PlacesAuthz.prototype.canCreate=function() {
      //console.log("ItemsAuthz.canCreate");
      return Authz.isAuthenticated();
    };

    return new PlacesAuthz();
  }
})();