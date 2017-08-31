(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdPlaceSelector", {
      templateUrl: placeSelectorTemplateUrl,
      controller: PlaceSelectorController,
      bindings: {
        authz: "<"
      }
    })
    .component("sdPlaceEditor", {
      templateUrl: placeEditorTemplateUrl,
      controller: PlaceEditorController,
      bindings: {
        authz: "<"
      },
      require: {
        placesAuthz: "^sdPlacesAuthz"
      }
    });

  placeSelectorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function placeSelectorTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.place_selector_html;
  }    
  placeEditorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function placeEditorTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.place_editor_html;
  }  


  PlaceSelectorController.$inject = ["$scope",
                                     "$stateParams",
                                     "spa-demo.authz.Authz",
                                     "PlaceFactory"];
  function PlaceSelectorController($scope, $stateParams, Authz, Place) {
    var vm=this;

    vm.$onInit = function() {
      console.log("PlaceSelectorController",$scope);
      $scope.$watch(function(){ return Authz.getAuthorizedUserId(); }, 
                    function(){ 
                      if (!$stateParams.id) { 
                        vm.items = Place.query(); 
                      }
                    });
    }
    return;
    //////////////
  }

  PlaceEditorController.$inject = ["$scope","$q",
                                   "$state", "$stateParams",
                                   "spa-demo.authz.Authz",                                   
                                   "PlaceFactory",
                                   ];


 function PlaceEditorController($scope, $q, $state, $stateParams, 
                                 Authz, Place) {
    var vm=this;
    vm.create = create;
    vm.clear  = clear;
    vm.update  = update;
    vm.remove  = remove;

    vm.$onInit = function() {
      console.log("PlaceEditorController",$scope);
      $scope.$watch(function(){ return Authz.getAuthorizedUserId(); }, 
                    function(){ 
                      if ($stateParams.id) {
                        reload($stateParams.id);
                      } else {
                        newResource();
                      }
                    });
    }
    return;
    //////////////
    function newResource() {
      console.log("newResource()");
      vm.item = new Place();
      vm.placesAuthz.newItem(vm.item);
      return vm.item;
    }

    function reload(placeId) {
      var itemId = placeId ? placeId : vm.item.id;
      console.log("re/loading place", itemId);
      vm.item = Place.get({id:itemId});
      vm.placesAuthz.newItem(vm.item);
      $q.all([vm.item.$promise]).catch(handleError);
    }

    function clear() {
      newResource();
      $state.go(".", {id:null});
    }

    function create() {
      vm.item.$save().then(
        function(){
           $state.go(".", {id: vm.item.id}); 
        },
        handleError);
    }

    function update() {
      vm.item.errors = null;
      var update=vm.item.$update();
    }
    function remove() {
      vm.item.errors = null;
      vm.item.$delete().then(
        function(){ 
          console.log("remove complete", vm.item);          
          clear();
        },
        handleError);      
    }


    function handleError(response) {
      console.log("error", response);
      if (response.data) {
        vm.item["errors"]=response.data.errors;          
      } 
      if (!vm.item.errors) {
        vm.item["errors"]={}
        vm.item["errors"]["full_messages"]=[response]; 
      }      
      $scope.placeform.$setPristine();
    }    
  }



})();
