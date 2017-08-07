(function(){
  'use strict'
  angular.module('app')
  .controller('citiesController',['$scope','CityFactory' ,function($scope,City){
      var vm = this;
      vm.cities;
      vm.city;
      vm.edit   = function(c) {
        vm.city = c;
      };
      
      vm.create = function() {
        vm.city.$save()
           .then(function(response){
              //console.log(vm.city)
              //console.log(response)
             vm.cities.push(vm.city);
            newCity();
            })
            .catch(handleError);
      };

      vm.update =  function() {
        vm.city.$update()
          .then(function(response){
        })
        .catch(handleError);
      };

      vm.remove = function() {
        vm.city.$delete()
          .then(function(response){
           vm.cities = City.query();
           newCity();
          })
          .catch(handleError);
      };

      activate();
      function activate() {
        newCity();
        vm.cities = City.query();
      }

      function newCity() {
        vm.city = new City();
      }

     function handleError(response) {
        console.log(response);
      }

    }
  ])
})()
