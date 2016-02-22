'use strict';

angular.module('maapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events?f',
        templateUrl: 'app/events/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'events'
      });
  });
