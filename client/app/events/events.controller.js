'use strict';

(function() {

class EventsController {

  constructor($http, Locator) {
    this.$http = $http;
    this.locator = Locator;
    this.events = [];
    Locator.locate().then((coords) => {
      this.userCoords = coords;
    });

    $http.get('/api/events').then(response => {
      this.events = response.data.map((event) => {
        event.location.coordinates.latitude = event.location.coordinates.lat;
        event.location.coordinates.longitude = event.location.coordinates.lng;
        event.distance = Locator.getDistance(event.location.coordinates.lat, event.location.coordinates.lng);
        return event;
      });
    });

  }
}

angular.module('maapApp')
  .controller('EventsCtrl', EventsController);

})();
