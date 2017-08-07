(function() {
  "use strict";

  angular.module('app')
  .config(["$stateProvider","$urlRouterProvider","APP_CONFIG","$locationProvider",
    function ($stateProvider, $urlRouterProvider, APP_CONFIG,$locationProvider) {
    $stateProvider
    .state("home",{
      url: "/",
      templateUrl: APP_CONFIG.main_page_html,
     })

    $urlRouterProvider.otherwise("/");

     $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
     
    }]);


})();