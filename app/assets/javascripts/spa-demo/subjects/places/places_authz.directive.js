(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .directive("sdPlacesAuthz", PlacesAuthzDirective);

  PlacesAuthzDirective.$inject = [];

  function PlacesAuthzDirective() {
    var directive = {
        bindToController: true,
        controller: PlacesAuthzController,
        controllerAs: "vm",
        restrict: "A",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
      console.log("PlacesAuthzDirective", scope);
    }
  }

  PlacesAuthzController.$inject = ["$scope",
                                   "spa-demo.subjects.PlacesAuthz"];
  function PlacesAuthzController($scope, PlacesAuthz) {
    var vm = this;
    vm.authz={};
    vm.authz.canUpdateItem = canUpdateItem;
    vm.newItem=newItem;

    activate();
    return;
    //////////
    function activate() {
      vm.newItem(null);
    }

    function newItem(item) {
      PlacesAuthz.getAuthorizedUser().then(
        function(user){ authzUserItem(item, user); },
        function(user){ authzUserItem(item, user); });
    }

    function authzUserItem(item, user) {
      console.log("new Item/Authz", item, user);

      vm.authz.authenticated = PlacesAuthz.isAuthenticated();
      vm.authz.canQuery      = PlacesAuthz.canQuery();
      vm.authz.canCreate = PlacesAuthz.canCreate();
      if (item && item.$promise) {
        vm.authz.canUpdate     = false;
        vm.authz.canDelete     = false;
        vm.authz.canGetDetails = false;
        item.$promise.then(function(){ checkAccess(item); });
      } else {
        checkAccess(item)
      }
    }

    function checkAccess(item) {
      vm.authz.canUpdate     = PlacesAuthz.canUpdate(item);
      vm.authz.canDelete     = PlacesAuthz.canDelete(item);
      vm.authz.canGetDetails = PlacesAuthz.canGetDetails(item);
      console.log("checkAccess", item, vm.authz);
    }    

    function canUpdateItem(item) {
      return PlacesAuthz.canUpdate(item);
    }    
  }
})();