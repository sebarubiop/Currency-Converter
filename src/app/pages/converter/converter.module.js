
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.converter', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('converter', {
          url: '/converter',
          templateUrl: 'app/pages/converter/converter.html',
          title: 'Currency Converter',
          controller: 'converterCtrl',
          controllerAs: 'convctrl',
          sidebarMeta: {
            order: 0,
          }
        });
  }

})();