'use strict';

(function() {

  class EventController {

    constructor($http, $stateParams) {
      this.$http = $http;

      $http.get('/api/events/'+$stateParams.id).then(response => {
        this.event = response.data;
        console.log(this.event);
      });

    }
  }

  angular.module('maapApp')
    .controller('EventCtrl', EventController);

})();
