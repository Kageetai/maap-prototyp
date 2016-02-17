'use strict';

angular.module('maapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('event', {
        url: '/events/:id',
        templateUrl: 'app/events/event/event.html',
        controller: 'EventCtrl',
        controllerAs: 'event'
      });
  });
