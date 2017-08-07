(function(){
	angular.module('app').directive('citiesList', ['APP_CONFIG',function (APP_CONFIG) {
		return {
      		templateUrl: APP_CONFIG.cities_html,
    	    replace: true,
	        bindToController: true,
			restrict: 'E',
			controller: 'citiesController',
			controllerAs: 'citiesVM'

		};
	}])
})()