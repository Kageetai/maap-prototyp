'use strict';

(function() {

class EventsController {

  constructor($http) {
    this.$http = $http;
    this.events = [];

    $http.get('/api/events').then(response => {
      this.events = response.data.map((event) => {
        event.location.coordinates.latitude = event.location.coordinates.lat;
        event.location.coordinates.longitude = event.location.coordinates.lng;
        return event;
      });
    });

  }
}

angular.module('maapApp')
  .controller('EventsCtrl', EventsController);

})();
