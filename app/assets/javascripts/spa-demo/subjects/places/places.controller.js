(function(){
  "use strict"
  angular
  .module('spa-demo.subjects')
  .controller('PlaceController', ['$scope','PlaceFactory', function($scope,Place){


      var vm = this;
      vm.places;
      vm.place;
      vm.edit   = edit;
      vm.create = create;
      vm.update = update;
      vm.remove = remove;      
      activate();
      return;
      function activate() {
        newPlace();
        vm.places = Place.query();
        console.log(vm.places);
      }

      function newPlace() {
        vm.place = new Place();
      }
      function handleError(response) {
      } 
      function edit(object) {
        vm.place = object;        
      }

      function create() {
        vm.place.$save()
          .then(function(response){
            vm.places.push(vm.place);
            newPlace();
          })
          .catch(handleError);        
      }

      function update() {
        vm.place.$update()
          .then(function(response){
        })
        .catch(handleError);        
      }

      function remove() {
        vm.place.$delete()
          .then(function(response){
            removeElement(vm.places, vm.place);
            newPlace();
          })
          .catch(handleError);                
      }


      function removeElement(elements, element) {
        for (var i=0; i<elements.length; i++) {
          if (elements[i].id == element.id) {
            elements.splice(i,1);
            break;
          }        
        }        
      }  




  }])
})();

